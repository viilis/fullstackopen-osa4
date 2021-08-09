const blogRouter = require('express').Router();
const Blog = require('../models/blog');

const undefCheck = (element) => {
  if ((typeof element === 'undefined') || (element === '') || (element == null)) {
    return 0;
  }
};

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs.map((blog) => blog.toJSON()));
});

blogRouter.post('/', async (req, res, next) => {
  const like = undefCheck(req.body.likes);

  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: like,
  });
  try {
    const savedBlog = await blog.save();
    res.json(savedBlog.toJSON());
  } catch (exception) {
    next(exception);
  }
});

module.exports = {
  blogRouter,
  undefCheck,
};
