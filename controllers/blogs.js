const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs.map(blog => blog.toJSON()));
});

blogRouter.post('/', async (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes,
  });
  try{
    const savedBlog = await blog.save();
    res.json(savedBlog.toJSON())
  } catch(exception) {
    next(exception)
  };
});

module.exports = blogRouter;
