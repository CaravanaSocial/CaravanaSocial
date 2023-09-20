const { blog } = require("../../db")

const postBlogController = async (info) => {
    const {author, title, image, template, date, selection, urlData} = info
    
    const createdBlogs = await blog.create({
        author,
        title,
        image,
        template,
        date,
        type:selection,
        urlData:urlData[selection]
    })
    
    return createdBlogs;"au"

};

module.exports = {
    postBlogController
}