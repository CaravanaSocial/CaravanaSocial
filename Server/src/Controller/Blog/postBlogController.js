const { blog } = require("../../db")

const postBlogController = async (id, author, title, image, template, date) => {
    const createdBlogs = await blog.create({
        author,
        title,
        image,
        template,
        date
    })

    return createdBlogs;"au"
};

module.exports = {
    postBlogController
}