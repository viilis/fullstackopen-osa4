const dummy = (blogs) => 1;

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
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
