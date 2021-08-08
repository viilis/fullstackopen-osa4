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

test('http get test', async () => {
    const res = await api.get('/api/blogs')
    expect(res.body).toHaveLength(helper.initBlogs.length)
});

afterAll( () => {
    mongoose.connection.close()
});