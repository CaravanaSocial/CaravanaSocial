const { getAll } = require('../Controller/getAllTrainingController')

const getAlltraining = async (req, res) => {
    try {
        
        const getTrainings = await getAll();

        if(getTrainings.length === 0) return res.status(400).json({error: "No hay capacitaciones existentes"})

        return res.status(200).json(getTrainings)

    } catch (error) {
        return res.status(400).send(error.message)
    }
}

module.exports = {
    getAlltraining
}