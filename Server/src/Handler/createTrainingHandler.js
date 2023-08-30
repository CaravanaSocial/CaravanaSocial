const { getCreatedTraining, createTraining } = require('../Controller/createTrainingController')

const trainingHandler = async (req, res) => {
    try {

        const foundTraining = await getCreatedTraining(req.body)
        const { name, description, video, companyId } = req.body
        
        if(!name || !description || !video || !companyId) return res.status(401).json({error: "Falta informacion"})

        if(foundTraining) return  res.status(400).json({error : "El material de capacitacion ya existe"})

        const trainingOk = await createTraining(req.body)
        return res.status(200).json(trainingOk);

    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    trainingHandler
}