const { getCreatedTraining, createTraining } = require('../Controller/createTrainingController')

const trainingHandler = async (req, res) => {
    try {
        const { name, description, video } = req.body;

        const foundTraining =  getCreatedTraining(video)

        if(foundTraining) res.status(400).json({error : "El material de capacitacion ya existe"})

        const trainingOk = createTraining(req.body)
        return res.status(200).json(trainingOk);

    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.export = {
    trainingHandler
}