const { training } = require('../../db');


const updateTrainingController = async (body, params) => {
    try {
        const { id } = params
        const { name, description, video} = body;
        const trainingToChange = await training.findByPk(id);
        

        if(!trainingToChange) throw error

        const newTraining = {
            id,
            name : name? name : trainingToChange.name,
            description : description? description : trainingToChange.description,
            video : video ? video :  trainingToChange.video
        }

        await trainingToChange.update(newTraining)

        return newTraining
    } catch (error) {
        throw error
    }
}

module.exports = {
    updateTrainingController
}