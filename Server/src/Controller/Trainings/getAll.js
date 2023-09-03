const { training, companies, areaTraining } = require('../../db');

const getAll = async () => {
    try {
        const findAll = await training.findAll({
            include: [
                {
                  model: companies, 
                  include: [
                    {
                      model: areaTraining, 
                    },

                  ],
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