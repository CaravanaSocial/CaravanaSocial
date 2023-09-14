const { blog } = require("../../db")



const getByIdController = async (id) => {
    try {
        const foundBlog = await blog.findByPk(id)

        return foundBlog 
    } catch (error) {
        throw error
    }

}

module.exports = {
    getByIdController
}