const { comment } = require('../../db')

const postCommentsController = async (id, body) => {
    try {
        const { description, userName, imageUser } = body

        const newComment = await comment.create({
            description,
            userName,
            imageUser
    
        })
        
        await newComment.setTraining(id)

        return newComment
    } catch (error) {
        throw error
    }
}

module.exports = {
    postCommentsController
}