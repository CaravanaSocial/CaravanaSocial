const { training, companies, areaTraining, comment, admin } = require('../../db');
const { Op } = require('sequelize')

const getTrainingOnDb = async (name) => {
    try {
        const findByName = await training.findAll({
            where:{
                name:{
                    [Op.iLike]: `%${name}%`
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
                {
                  model: comment
                },
                {
                  model: admin
                },
              ]
        })
    
        console.log(findByName);
        return findByName
    } catch (error) {
        throw error
    }
}

module.exports = {
    getTrainingOnDb
}