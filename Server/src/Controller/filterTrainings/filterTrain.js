const  { training, companies } = require('../../db')

const filterTrain = async (query) => {
    try {
        const { country } = query

        const alltrain =  await  training.findAll({
            include: companies
        })

    
        const trainingfil = alltrain.filter((train) => train.dataValues.company.dataValues.location.contry === country)
        return trainingfil
    } catch (error) {
        throw error
    }

    
}


module.exports = {
    filterTrain
}