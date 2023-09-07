const { postCommentsController } = require('../Controller/Comments/postCommentsController')
const { getCommentsController }= require('../Controller/Comments/getCommentsContoller')
const { deleteCommentsController } = require('../Controller/Comments/deleteCommentsController')


const postCommentsHandler = async (req, res)=> {
    try {
        const { id } = req.params;
       
        const commentCreate = await postCommentsController(id, req.body);

        return res.status(200).json(commentCreate);

    } catch (error) {
        return res.status(400).send(error.message)
    }
}

const getCommentsHandler = async (req, res) => {
    try {
        const getComments = await getCommentsController();

        return res.status(200).json(getComments);

    } catch (error) {
        return res.status(400).send(error.message)
    }
}


const deleteCommentsHandler = async (req, res) => {
    try {
        const {id} = req.params;

        const deleteComments = await deleteCommentsController(id)

        return res.status(200).json(deleteComments);
    } catch (error) {
        return res.status(400).send(error.message)
    }
}


module.exports= {
    postCommentsHandler,
    getCommentsHandler,
    deleteCommentsHandler
}