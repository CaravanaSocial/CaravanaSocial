const { blog } = require("../../db")


const getAllBlogController = async () => {
    try {
        const all = await blog.findAll()

        return all
    } catch (error) {
        
    }
}

module.exports ={
    getAllBlogController
}