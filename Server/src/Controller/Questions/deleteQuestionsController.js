const { question } = require('../../db')


const deleteQuestionsController = async (id) => {
    try {
        const questionToDelete = await question.destroy({
            where:{
                id
            }
        })
        return questionToDelete
    } catch (error) {
        throw error
    }
}

module.exports ={
    deleteQuestionsController
}