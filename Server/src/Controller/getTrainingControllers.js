const { Op } = require('sequelize')
const { training, companies } = require('../db')

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

module.exports = {
    getTrainingOnDb
}