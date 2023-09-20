const { Op } = require("sequelize");
const { training, companies, areaTraining } = require("../../db");
// const { getAll } = require("../Trainings/getAll");

const filterTrain = async (query) => {
  try {
      const { country } = query
      const { rubro } = query
      console.log(rubro);
      console.log(country);

      const alltrain =  await  training.findAll({
        include:[{
          model:companies
        },
        {
          model:areaTraining,
          attributes: ["name"],
          through:{attributes:[]}
        }]
      })

      if(country && !rubro){
          const trainingfilCountry = alltrain.filter((train) => {
              return train.dataValues.company.dataValues.location.contry === country
          })

          return trainingfilCountry
      }
      if(!country && rubro){
          const trainingfilarea = alltrain.filter((train) => train.areaTrainings.some((area) => area.dataValues.name === rubro))
          console.log(trainingfilarea);
          return trainingfilarea
      }
      if(country && rubro){
        console.log("hola");
          const trainingfilCountry = alltrain.filter((train) => {
              return train.dataValues.company.dataValues.location.contry === country
          })

      const finallyBoth = trainingfilCountry.filter((train) => train.areaTrainings.some((area) => area.dataValues.name === rubro))

          return finallyBoth;
      }
      else{
          return alltrain
      }




  } catch (error) {
      throw error
  }


}
module.exports ={
  filterTrain
}