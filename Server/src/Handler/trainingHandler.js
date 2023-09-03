const { delTraining } = require('../Controller/Trainings/delTraining')
const { changer } = require('../Controller/Trainings/changer')
const { getCreatedTraining } = require('../Controller/Trainings/getCreatedTraining')
const { getAll } = require('../Controller/Trainings/getAll')
const { getTrainingOnDb } = require('../Controller/Trainings/getTrainingOnDb')
const { getTrainingByIdController } = require("../Controller/Trainings/getTrainingByIdController")

const getAlltraining = async (req, res) => {
    try {
        
        const getTrainings = await getAll();

        if(getTrainings.length === 0) return res.status(400).json({error: "No hay capacitaciones existentes"})

        return res.status(200).json(getTrainings)

    } catch (error) {
        return res.status(400).send(error.message)
    }
}



const getTrainingByName = async (req, res) => {
    try {
        const { name } = req.query;

        const getTraining = await getTrainingOnDb(name)
        if(getTraining.length === 0) return res.status(400).json({error: "No se encontro ninguna capacitacion con ese nombre"})

        return res.status(200).json(getTraining)

    } catch (error) {
        return res.status(400).send(error.message)
    }
    
}


const trainingHandler = async (req, res) => {
    try {
        const foundTraining = await getCreatedTraining(req.body, req.id)

            return res.status(200).json(foundTraining)

    } catch (error) {
        res.status(400).send(error.message)
    }   
}


const updateTraining = async (req, res) => {
    try {
        console.log('nose');
        const allDone = await changer(req.body);
        console.log(allDone)

        if(!allDone) return res.status(400).send('Algo salio mal ')

        

        return res.status(200).send(allDone)
    } catch (error) {
        res.status(400).send(error.message)
    }
}


const deletetraining = async (req, res) => {
    const { id } = req.query;
    const trainingDeleted = await delTraining(id)
    if(trainingDeleted) return res.status(200).send('La capacitacion fue eliminada')
    return res.status(404).send('La capacitacion no se ha encontrado')
}

const getTrainingByIdHandler = async (req, res) =>{
    try {
        const {id} = req.params
        const training = await getTrainingByIdController(id)
        res.status(200).json(training)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}




module.exports = {
    updateTraining,
    trainingHandler,
    getTrainingByName,
    getAlltraining,
    deletetraining,
    getTrainingByIdHandler
}





