const { questionCreateController } = require('../Controller/Questions/postQuestionController')
const { getQuestionsController } = require('../Controller/Questions/getQuestionsController')
const { patchQuestionController } = require('../Controller/Questions/patchQuestionsController')
const { deleteQuestionsController } = require('../Controller/Questions/deleteQuestionsController')


const createQuestionHandler = async (req, res) => {
    try {
        const questionCreate = await questionCreateController(req.body)

        if(questionCreate){
            return res.status(200).send('La pregunta y su respuesta fueron creadas correctamente')
        }else{
            throw new Error('La pregunta y su respuesta ya fueron creadas')
        }

    } catch (error) {
        return res.status(400).send(error.message)
    }
}

const getQuestionsHandler = async (req, res) => {
    try {
        const questions = await getQuestionsController()
    
        return res.status(200).json(questions);

    } catch (error) {
        return res.status(400).send(error.message)
    }
}

const updateQuestionsHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const {quest, answer} = req.body 
       
        const questionUpdated = await patchQuestionController(id, quest, answer)
        return res.status(200).json(questionUpdated);
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

const deleteQuestionsHandler = async (req, res) => {
    try {
        const { id } = req.params;
    
        const questionDelete = await deleteQuestionsController(id)
        return res.status(200).json(questionDelete)
    } catch (error) {
        return res.status(400).send(error.message)
    }
}


module.exports= {
    createQuestionHandler,
    getQuestionsHandler,
    updateQuestionsHandler,
    deleteQuestionsHandler
}