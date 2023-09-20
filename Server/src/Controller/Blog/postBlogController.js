const { blog } = require("../../db")

const postBlogController = async (info) => {
    const {author, title, image, template, date, selection, urlData} = info
    
    console.log(info)
    
    const createdBlogs = await blog.create({
        author,
        title,
        image,
        template,
        date,
        type:selection,
        urlData:urlData[selection]
    })
    console.log('hello')
    return createdBlogs;"au"

};

module.exports = {
    postBlogController
}