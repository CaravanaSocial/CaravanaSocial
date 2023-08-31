const { training } = require('../db')

const changer = async (body) => {
    try {
        const {id, name, description, video} = body;

        const trainingToChange = await training.findByPk(id);

        if(!trainingToChange) throw error

        const newTraining = {
            id,
            name : name? name : trainingToChange.name,
            description : description? description : trainingToChange.name,
            video : video ? video :  trainingToChange.name
        }

        await trainingToChange.update(newTraining)

        return "Capacitacion Actualizada"
    } catch (error) {
        throw error
    }
}

module.exports = {
    changer
}