const { training } = require('../db')
const { companies } = require('../db')

const getCreatedTraining = async (body) => {
    try {
        const {video} = body
        const checkTraining = await training.findOne({
            where:{
                video
            }
        })
        return checkTraining
    } catch (error) {
        throw error
    }
}

const createTraining = async (body) => {
    try {
        const { name, description, video, companyId } = body;

        const newTraining = await training.create({
            name,
            description,
            video
        })

        

        await newTraining.setCompany(companyId)

        return newTraining;
    } catch (error) {
        throw error
    }


} 

module.exports = {
    getCreatedTraining,
    createTraining
}