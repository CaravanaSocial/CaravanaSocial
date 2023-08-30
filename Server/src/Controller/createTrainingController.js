const { training } = require('../db')

const getCreatedTraining = async (video) => {
    try {
        const checkTraining = await training.findOne({
            where:{
                video
            }
        })
        return res.status(200).json(checkTraining);
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const createTraining = async (body) => {
    try {
        const { name, description, video } = body;

        const newTraining = await training.create({
            name,
            description,
            video
        })

        return res.status(200).json(newTraining);
    } catch (error) {
        return res.status(400).json({error: error.message})
    }


} 

module.export = {
    getCreatedTraining,
    createTraining
}