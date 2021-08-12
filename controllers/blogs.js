const blogRouter = require('express').Router();
const Blog = require('../models/blog');

const undefCheck = (element) => {
  if ((typeof element === 'undefined') || (element === '') || (element == null)) {
    return 0;
  }else{
    return element
  }
};

const checkTitleAndUrl = (body, res) => {
  const keys = Object.keys(body);
  if (((keys.includes('title') === false) && (keys.includes('url') === false))) {
    res.status(400).end();
  }
};

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs.map((blog) => blog.toJSON()));
});

blogRouter.post('/', async (req, res, next) => {
  checkTitleAndUrl(req.body, res);
  const like = undefCheck(req.body.likes);
  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: like,
  });
  console.log(blog.likes)
  try {
    const savedBlog = await blog.save();
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
