const _ = require('lodash');

const totalLikes = (blogs) => {
  let total = 0;
  for (let i = 0; i < blogs.length; i++) {
    total += blogs[i].likes;
  }
  return total;
};

const favoriteBlog = (blogs) => {
  const mostLikes = [0, 0];
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > mostLikes[0]) {
      mostLikes[0] = blogs[i].likes;
      mostLikes[1] = i;
    }
  }
  return blogs[mostLikes[1]];
};
const mostBlogs = (blogs) => _.maxBy((blogs.map((o) => [{ author: o.author, blogs: o.blogs }]).flat()), (o) => o.blogs);

const mostLikes = (blogs) => {
  const authorsAndBlogs = blogs.map((o) => [o.author, o.likes]);
  const authors = blogs.map((o) => o.author);
  const filter = (data) => [...new Set(data)].map((o) => [{ author: o, likes: 0 }]).flat();
  const empty = filter(authors);
  for (let i = 0; i < empty.length; i++) {
    for (let j = 0; j < authorsAndBlogs.length; j++) {
      if (empty[i].author === authorsAndBlogs[j][0]) {
        empty[i].likes += authorsAndBlogs[j][1];
      }
    }
  }
  return _.maxBy(empty, (o) => o.likes);
};

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
