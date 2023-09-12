const { training, companies, areaTraining , comment} = require('../../db');

const getAll = async (option) => {
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
           {
            model: comment
          } 
        ]
      })

      switch(option) {
        case "approved" :
          const approved = findAll.filter((training) => training.approved === true)
          return approved
        case "declined" :
          const declined = findAll.filter((training) => training.approved === false)
          return declined;
        case "noCheck" :
          const noCheck = findAll.filter((training) => training.approved === null)
          return noCheck;
        default :
          return findAll;
      }
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAll
}