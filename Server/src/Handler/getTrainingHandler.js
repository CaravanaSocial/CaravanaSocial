const { getTrainingOnDb } = require('../Controller/getTrainingControllers')

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

module.exports = {
    getTrainingByName
}