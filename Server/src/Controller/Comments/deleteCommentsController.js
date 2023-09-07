const { comment } = require("../../db")


const deleteCommentsController = (id) => {
    try {
        const commentDelete = comment.destroy({
            where:{
                id
            }
        })
    
        return commentDelete
    } catch (error) {
        throw error
    }
}

module.exports = {
    deleteCommentsController
}