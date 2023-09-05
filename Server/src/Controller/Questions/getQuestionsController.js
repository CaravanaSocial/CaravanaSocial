const { question } = require('../../db')


const getQuestionsController = async (req, res) => {
    try {
        const questions = await question.findAll()

        return questions

    } catch (error) {
        throw error
    }


}

module.exports = {
    getQuestionsController
}