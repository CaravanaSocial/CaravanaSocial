const {training, areaTraining, companies} = require("../../db")

const getTrainingByIdController = async (id) =>{
    const foundTraining = await training.findOne({
        where: {id},
        include: [
            {
              model: companies,
              attributes: {
                exclude: ["password"],
              },
              include: [
                {
                  model: areaTraining,
                  attributes: ["name"],
      
                  through: { attributes: [] },
                },
              ],
            },
            {
              model: areaTraining,
              attributes: ["name"],
              through: { attributes: [] },
            },
          ],
          attributes: ["name"],
          through: { attributes: [] },
    })

    if(foundTraining) return foundTraining
    throw Error("Training not found")
}

module.exports={
    getTrainingByIdController
}