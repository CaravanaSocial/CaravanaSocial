
const {training, areaTraining, companies, comment, admin} = require("../../db")

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
        },
        {
          model: admin,
        },
      ]
    })

    if(foundTraining) return foundTraining
    throw Error("Training not found")
}

module.exports={
    getTrainingByIdController
}