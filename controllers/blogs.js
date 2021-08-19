const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const { findByIdAndUpdate } = require('../models/user');
const User = require('../models/user')

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

const checkIfNoUsers = (users,res) => {
  if(users.length === 0){
    return res.status(400).send({error: 'No user found. Please create user first'})
  }
  else{
    return users
  }
}

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('users');
  res.json(blogs.map((blog) => blog.toJSON()));
});

blogRouter.post('/', async (req, res, next) => {
  try {
    checkTitleAndUrl(req.body, res);
    //link for user to every blogpost
    const user = checkIfNoUsers(await User.find({}),res)[0]
    
    const like = undefCheck(req.body.likes);
    const blog = new Blog({
      title: req.body.title,
      author: req.body.author,
      url: req.body.url,
      likes: like,
      users: user._id
    });
    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    res.json(savedBlog.toJSON());
  } catch (exception) {
    next(exception);
  }
});

blogRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id);
  const allBlogs = await Blog.find({});
  allBlogs.map((b) => b.toJSON());
  res.status(204).json(allBlogs);
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
