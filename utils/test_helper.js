const testBlogs =  require('../models/blog')

const initBlogs = [
    {
        title: "awesome-title-1",
        author: "awesome-author-1",
        url: "awesome-url-1",
        likes: 1
    },
    {
        title: "awesome-title-2",
        author: "awesome-author-2",
        url: "awesome-url-2",
        likes: 2
    },
];

const allBlogsFromDB = async () => {
    const blogs = await testBlogs.find({})
    return blogs.map( b => b.toJSON())
};

module.exports = {
    initBlogs,
    allBlogsFromDB,
};
