const { getCreatedTraining, createTraining } = require('../Controller/createTrainingController')

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

module.exports = {
    trainingHandler
}