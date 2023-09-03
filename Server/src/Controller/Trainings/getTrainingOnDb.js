const { training, companies, areaTraining } = require('../../db');
const { Op } = require('sequelize')

const getTrainingOnDb = async (name) => {
    try {
        const findByName = await training.findAll({
            where:{
                name:{
                    [Op.iLike]: `${name}%`
                }
            },
            include:[
                {
                  model: companies,
                  attributes: {
                    exclude: ["password"],
                  }
                },
                {
                  model: areaTraining,
                  attributes: ["name"],
                  through: { attributes: [] },
                },
              ]
        })
    
        return findByName
    } catch (error) {
        throw error
    }
}

module.exports = {
    getTrainingOnDb
}