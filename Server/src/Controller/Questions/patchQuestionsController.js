const { question } = require('../../db')



const patchQuestionController = async (id, quest, answer) => {
    try {

        const questionToUpdate = await question.findByPk(id)
    
        if(!questionToUpdate) throw error;
    
        const newQuestion = {
            id,
            question: question? quest :questionToUpdate.question, 
            answer: answer ?  answer: questionToUpdate.answer
        }
    
        await questionToUpdate.update(newQuestion)
    
        return newQuestion
    } catch (error) {
        throw error
    }
}

module.exports = {
    patchQuestionController
}