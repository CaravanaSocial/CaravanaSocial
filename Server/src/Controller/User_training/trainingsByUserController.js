const {user, training} = require('../../db')

const trainingsByUserController = async(id)=>{

    try {
        const data = await training.findAll({include:{model:user, where:{id:id}}})

        return data;
    } catch (error) {
        return error
    }
}

module.exports = {
    trainingsByUserController
}