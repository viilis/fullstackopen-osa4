const listHelper = require('../utils/list_helper');

describe('total likes', () => {
  const likeList = [{
    title: 'awesome-title',
    likes: 2,
  }];

  test('likes of one blog on the list', () => {
    expect(listHelper.totalLikes(likeList)).toBe(2);
  });
});
describe('favorite show', () => {
  const likeList = [{
    title: 'awesome-title',
    likes: 2,
  },
  {
    title: 'awesome-title 2',
    likes: 122,
  },
  ];

  test('return show that has most likes', () => {
    expect(listHelper.favoriteBlog(likeList)).toEqual({
      title: 'awesome-title 2',
      likes: 122,
    });
  });
});
describe('most blogs', () => {
  const list = [{
    title: 'awesome-title',
    likes: 2,
    author: 'doge',
    blogs: 99,
  },
  {
    title: 'awesome-title 2',
    likes: 122,
    author: 'doge',
    blogs: 1,
  },
  {
    title: 'awesome-title 3',
    likes: 12,
    author: 'egod',
    blogs: 33,
  },
  ];
  test('should return author with most blogs', () => {
    expect(listHelper.mostBlogs(list)).toEqual({ author: 'doge', blogs: 99 });
  });
});

describe('most likes', () => {
  const list = [{
    title: 'awesome-title',
    likes: 2,
    author: 'doge',
    blogs: 99,
  },
  {
    title: 'awesome-title 2',
    likes: 122,
    author: 'doge',
    blogs: 1,
  },
  {
    title: 'awesome-title 3',
    likes: 12,
    author: 'egod',
    blogs: 33,
  },
  ];
  test('return most liked author', () => {
    expect(listHelper.mostLikes(list)).toEqual({ author: 'doge', likes: 124 });
  });
});
