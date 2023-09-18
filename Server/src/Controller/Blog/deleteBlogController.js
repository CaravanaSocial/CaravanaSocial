const { blog } = require("../../db")


const deleteBlogController = async (id) => {
try {
    const blogToDelete = blog.destroy({where:{id}})

    return blogToDelete
} catch (error) {
    throw error
}
}

module.exports = {
    deleteBlogController
}