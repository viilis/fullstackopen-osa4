const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});
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
