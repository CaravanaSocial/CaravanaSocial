const { training, companies, areaTraining } = require('../../db');

const getAll = async () => {
    try {
        const findAll = await training.findAll({
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
        return findAll
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAll
}