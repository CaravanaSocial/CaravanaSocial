const { blog } = require("../../db")


const patchBlogController = async (id, author, title, image, template, date) => {
    try {
        const blogReq = await blog.findByPk(id);

        if(!blogReq)throw error
    
        const newBlog = {
            author : author ? author : blogReq.author,
            title : title ? title : blogReq.title,
            image : image ? image : blogReq.image,
            template : template ? template : blogReq.template,
            date : date ? date : blogReq.date
        }
        await blogReq.update(newBlog)
    
        return newBlog    
    } catch (error) {
        throw error
    }
}

module.exports = {
    patchBlogController
}