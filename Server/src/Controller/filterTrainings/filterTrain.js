const  { training, companies, areaTraining} = require('../../db')
const { getAll } = require('../Trainings/getAll')

const filterTrain = async (query) => {
    try {
        const { country } = query
        const { rubro } = query

        const alltrain =  await  getAll()

        if(country && !rubro){
            const trainingfilCountry = alltrain.filter((train) => train.dataValues.company.dataValues.location.contry === country)
            console.log(trainingfilCountry);
            return trainingfilCountry
        }
        else if(!country && rubro){
            const trainingfilarea = alltrain.filter((train)=> train.dataValues.company.dataValues.areaTrainings.map((areas) => areas.dataValues.name).includes(rubro))
            console.log(trainingfilarea)
            return trainingfilarea
        }
        else if(country && rubro){
            const trainingfilCountry = alltrain.filter((train) => train.dataValues.company.dataValues.location.contry === country)
            const finallyBoth = trainingfilCountry.filter((train)=> train.dataValues.company.dataValues.areaTrainings.map((areas) => areas.dataValues.name).includes(rubro))

            return finallyBoth;
        }
        else{
            return alltrain
        }
  



    } catch (error) {
        throw error
    }

    
}


module.exports = {
    filterTrain
}