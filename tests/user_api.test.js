const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('../utils/test_helper');
const Users = require('../models/user');

const api = supertest(app);

beforeEach(async () => {
  await Users.deleteMany({});
  await Users.insertMany(helper.initUsers);
});

test('GET all users', async () => {
  const res = await api.get('/api/users');
  expect(res.body).toHaveLength(helper.initUsers.length);
});

afterAll(() => {
  mongoose.connection.close();
});
