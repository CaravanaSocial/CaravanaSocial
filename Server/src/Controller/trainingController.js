const { training, companies } = require('../db');
const { Op } = require('sequelize')

const getAll = async () => {
    try {
        const findAll = await training.findAll({
            include: companies
        })

        return findAll
    } catch (error) {
        throw error
    }
}



const getTrainingOnDb = async (name) => {
    try {
        const findByName = await training.findAll({
            where:{
                name:{
                    [Op.iLike]: `${name}%`
                }
            },
            include: companies
        })
    
        return findByName
    } catch (error) {
        throw error
    }
}




const getCreatedTraining = async (body) => {
    try {
        console.log('controller')
        const {name, description, video, companyId} = body
        if(!name || !description || !video || !companyId) return res.status(400).json({error: "Falta informacion"})
        console.log(video)

        const [user,created] = await training.findOrCreate({
            where:{
                video: video
            },defaults:{
                name,
                description,
                video
            }
        })
        await user.setCompany(companyId)
        return created

    } catch (error) {
        throw error
    }
}


const changer = async (body) => {
    try {
        const {id, name, description, video} = body;
        console.log(id, name, description, video);
        const trainingToChange = await training.findByPk(id);
        

        if(!trainingToChange) throw error

        const newTraining = {
            id,
            name : name? name : trainingToChange.name,
            description : description? description : trainingToChange.name,
            video : video ? video :  trainingToChange.name
        }

        await trainingToChange.update(newTraining)

        return newTraining
    } catch (error) {
        throw error
    }
}



const delTraining = (id) => {
    const trainingToDelete = training.destroy({
        where:{
            id: id
        }
    })
    return trainingToDelete
}



module.exports = {
    getCreatedTraining,
    getAll,
    getTrainingOnDb,
    changer,
    delTraining
}