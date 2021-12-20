const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const middleware = require('../utils/middleware');

const undefCheck = (element) => {
  if ((typeof element === 'undefined') || (element === '') || (element == null)) {
    return 0;
  }
  return element;
};

const checkTitleAndUrl = (body, res) => {
  const keys = Object.keys(body);
  if (((keys.includes('title') === false) && (keys.includes('url') === false))) {
    res.status(400).end();
  }
};

// eslint-disable-next-line no-unused-vars
const checkIfNoUsers = (users, res) => {
  if (users.length === 0) {
    return res.status(400).send({ error: 'No user found. Please create user first' });
  }

  return users;
};

// eslint-disable-next-line no-unused-vars
const getToken = (req) => {
  const aut = req.get('authorization');
  if (aut && aut.toLowerCase().startsWith('bearer ')) {
    return aut.substring(7);
  }
  return null;
};

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('users');
  res.json(blogs.map((blog) => blog.toJSON()));
});

blogRouter.use(middleware.tokenExtractor);
blogRouter.use(middleware.userExtractor);

blogRouter.post('/', async (req, res, next) => {
  try {
    checkTitleAndUrl(req.body, res);

    const user = await User.findById(req.user);

    const like = undefCheck(req.body.likes);

    const blog = new Blog({
      title: req.body.title,
      author: req.body.author,
      url: req.body.url,
      likes: like,
      users: user._id,
    });
    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    res.json(savedBlog.toJSON());
  } catch (exception) {
    next(exception);
  }
});

blogRouter.delete('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.user);

    if (user.blogs.filter((b) => b.toString()).includes(req.params.id)) {
      await Blog.findByIdAndRemove(req.params.id);

      user.blogs = user.blogs.filter((b) => b.toString() !== req.params.id);
      await user.save();

      const allBlogs = await Blog.find({});
      allBlogs.map((b) => b.toJSON());

      res.status(204).json(allBlogs);
    } else {
      res.status(400).json({ error: 'blogID is invalid' });
    }
  } catch (exception) {
    next(exception);
  }
});

blogRouter.put('/:id', async (req, res, next) => {
  try {
    const result = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, context: 'query' });
    res.status(200).json(result);
  } catch (exception) {
    next(exception);
  }
});

module.exports = {
  blogRouter,
};
