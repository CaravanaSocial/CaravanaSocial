const { training } = require('../../db');


const updateTrainingController = async (body, id) => {
    console.log("BODY: ",body);
        /* const { name, description, video} = body;
        const trainingToChange = await training.findByPk(params);
        

        if(!trainingToChange) throw error

        const newTraining = {
            name : name? name : trainingToChange.name,
            description : description? description : trainingToChange.description,
            video : video ? video :  trainingToChange.video
        } */

       const trainingUpdated = await training.update(body,{where:{id:id}})

        return trainingUpdated //newTraining
}

module.exports = {
    updateTrainingController
}