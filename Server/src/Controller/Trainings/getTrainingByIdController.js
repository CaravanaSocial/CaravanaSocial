const {training, areaTraining, companies} = require("../../db")

const getTrainingByIdController = async (id) =>{
    const foundTraining = await training.findAll({
      where:{
        id:id
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
        }
      ]
    })

    if(foundTraining) return foundTraining
    throw Error("Training not found")
}

module.exports={
    getTrainingByIdController
}