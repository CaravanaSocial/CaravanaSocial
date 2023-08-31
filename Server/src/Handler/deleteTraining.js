const { delTraining } = require('../Controller/trainingDelete')

const deletetraining = async (req, res) => {
    const { id } = req.query;
    const trainingDeleted = await delTraining(id)
    if(trainingDeleted) return res.status(200).send('La capacitacion fue eliminada')
    return res.status(404).send('La capacitacion no se ha encontrado')
}

module.exports = {
    deletetraining
}