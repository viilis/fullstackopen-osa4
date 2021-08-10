const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('../utils/test_helper');
const Blogs = require('../models/blog');

const api = supertest(app);

beforeEach(async () => {
  await Blogs.deleteMany({});
  await Blogs.insertMany(helper.initBlogs);
});

test('http GET for getting all blogs', async () => {
  const res = await api.get('/api/blogs');
  expect(res.body).toHaveLength(helper.initBlogs.length);
});

test('_id turns into id', async () => {
  const res = await api.get('/api/blogs');
  for (const blog of res.body) {
    expect(Object.keys(blog)).toContain('id');
  }
});

test('http POST for posting a blog', async () => {
  const newBlog = {
    title: 'post-test',
    author: 'dogedox',
    url: 'awesome-url',
    likes: 0,
  };
  await api
    .post('/api/blogs/')
    .send(newBlog)
    .expect(200);

  const res = await api.get('/api/blogs');
  const titles = res.body.map((b) => b.title);

  expect(res.body).toHaveLength(helper.initBlogs.length + 1);
  expect(titles).toContain('post-test');
});

test('if "likes" -field is empty, turn it into zero', async () => {
  const newBlog = {
    title: 'post-test',
    author: 'dogedox',
    url: 'awesome-url',
    likes: '',
  };
  await api
    .post('/api/blogs/')
    .send(newBlog)
    .expect(200);

  const res = await api.get('/api/blogs');
  const likes = res.body.map((b) => b.likes);

  expect(likes).not.toContain(undefined);
});

test('title or url missing, responses with status 400', async () => {
    const newBlog = {
        author: 'dogedox',
        likes: '',
      };
      await api
      .post('/api/blogs/')
      .send(newBlog)
      .expect(400)
});

test('delete by id', async () =>{
  const allIDs = await helper.allIDs()
  await api
  .delete(`/api/blogs/${allIDs[0]}`)
  .expect(204)

  expect(await helper.allBlogsFromDB()).toHaveLength(helper.initBlogs.length - 1)
});

test('update by id', async () => {
  const newBlog = {
    title: 'put-test',
    author: 'dogedox',
    url: 'awesome-url',
    likes: 0,
  };
  
  const allIDs = await helper.allIDs()
  await api
  .put(`/api/blogs/${allIDs[0]}`)
  .send(newBlog)
  .expect(200)

  expect(await helper.allTitlesFromBlogs()).toContain('put-test')
});

afterAll(() => {
  mongoose.connection.close();
});
