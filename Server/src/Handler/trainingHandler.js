const { delTraining } = require('../Controller/trainingController')
const { changer } = require('../Controller/trainingController')
const { getCreatedTraining } = require('../Controller/trainingController')
const { getAll } = require('../Controller/trainingController')
const { getTrainingOnDb } = require('../Controller/trainingController')

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
        console.log('handler')
        const foundTraining = await getCreatedTraining(req.body)

        if(foundTraining){
            return res.status(200).send('Capacitacion creada')
        }else{
            return res.status(404).send('Capacitacion ya existente')
        }
        
        

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
        res.status(400).json({error:"hola"})
    }
}


const deletetraining = async (req, res) => {
    const { id } = req.query;
    const trainingDeleted = await delTraining(id)
    if(trainingDeleted) return res.status(200).send('La capacitacion fue eliminada')
    return res.status(404).send('La capacitacion no se ha encontrado')
}






module.exports = {
    updateTraining,
    trainingHandler,
    getTrainingByName,
    getAlltraining,
    deletetraining
}





