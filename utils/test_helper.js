const Blogs = require('../models/blog');
const Users = require('../models/user');

const initBlogs = [
  {
    title: 'awesome-title-1',
    author: 'awesome-author-1',
    url: 'awesome-url-1',
    likes: 1,
  },
  {
    title: 'awesome-title-2',
    author: 'awesome-author-2',
    url: 'awesome-url-2',
    likes: 2,
  },
];

const initUsers = [
  {
    username:'testuser',
    password: 'superduperpassword',
    name: 'testname',
  },
  {
    username:'testuser2',
    password: 'superduperpassword2',
    name: 'testname2',
  },
]

const allUsersFromDB = async () => {
  const users = await Users.find({});
  return users.map((u) => u.toJSON());
};

const allBlogsFromDB = async () => {
  const blogs = await Blogs.find({});
  return blogs.map((b) => b.toJSON());
};

const allIDs = async () => {
  const blogs = await allBlogsFromDB();
  const ids = [];
  blogs.map((b) => ids.push(b.id));
  return ids;
};

const allTitlesFromBlogs = async () => {
  const blogs = await allBlogsFromDB();
  const titles = [];
  blogs.map((b) => titles.push(b.title));
  return titles;
};
module.exports = {
  initBlogs,
  initUsers,
  allBlogsFromDB,
  allUsersFromDB,
  allIDs,
  allTitlesFromBlogs,
};
