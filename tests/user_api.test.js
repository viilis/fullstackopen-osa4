const helper = require('../utils/test_helper');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const Users = require('../models/user');

beforeEach(async () => {
  await Users.deleteMany({});
  await Users.insertMany(helper.initUsers);
});

test('GET all users', async () => {
  const res = await api.get('/api/users');
  expect(res.body).toHaveLength(helper.initUsers.length);
});

test('password too short', async () => {
  const newUser = {
    username: 'superusername',
    password: 'a',
    name: 'dakdjadkad'
  }
  await api
  .post('/api/users/')
  .send(newUser)
  .expect(400)
});

test('not unique name', async () => {
  const users = await helper.allUsersFromDB()
  const newUser ={
    username: users[0].username,
    password: 'dasdasdasdad',
    name: 'dasdasdasd'
  }

  await api
  .post('/api/users/')
  .send(newUser)
  .expect(500)
});

afterAll(() => {
  mongoose.connection.close();
});
