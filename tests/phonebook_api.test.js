const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/test_helper')
const Blogs = require('../models/blog')
const logger = require('../utils/logger')

const api = supertest(app)

beforeEach( async () => {
    await Blogs.deleteMany({});
    await Blogs.insertMany(helper.initBlogs)
});

test('http GET for getting all blogs', async () => {
    const res = await api.get('/api/blogs')
    expect(res.body).toHaveLength(helper.initBlogs.length)
});

test('_id turns into id', async () => {
    const res = await api.get('/api/blogs')
    for(let blog of res.body){
        expect(Object.keys(blog)).toContain('id');
    }
});

test('http POST for posting a blog', async () => {
    const newBlog = {
        title: 'post-test',
        author: 'dogedox',
        url: 'awesome-url',
        likes: 0,
    }
    await api
    .post('/api/blogs/')
    .send(newBlog)
    .expect(200)

    const res = await api.get('/api/blogs')
    const titles =  res.body.map(b => b.title)

    expect(res.body).toHaveLength(helper.initBlogs.length + 1)
    expect(titles).toContain('post-test');
});

afterAll( () => {
    mongoose.connection.close()
});