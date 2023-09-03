const  { training, companies, areaTraining} = require('../../db')
const { getAll } = require('../Trainings/getAll')

const filterTrain = async (query) => {
    try {
        const { country } = query
        const { rubro } = query

        const alltrain =  await  getAll()

        if(country && !rubro){

            const trainingfilCountry = alltrain.filter((train) => {
                return train.dataValues.company.dataValues.location.contry === country
            })

            return trainingfilCountry
        }
        else if(!country && rubro){

            console.log(alltrain.map((train)=>train.dataValues.areaTrainings.map((area) => area.dataValues.name)))
            const trainingfilarea = alltrain.filter((train) => train.dataValues.areaTrainings.map((area) => area.dataValues.name).includes(rubro))
            return trainingfilarea
        }
        else if(country && rubro){
            const trainingfilCountry = alltrain.filter((train) => {
                return train.dataValues.company.dataValues.location.contry === country
            })

            const finallyBoth = trainingfilCountry.filter((train) => train.dataValues.areaTrainings.map((area) => area.dataValues.name).includes(rubro))

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