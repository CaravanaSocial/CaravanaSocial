const {user, training} = require('../../db')

const usersByTrainingController = async(id)=>{

    try {
        const data = await user.findAll({include:{model:training, where:{id:id}}})
        return data;
    } catch (error) {
        return error
    }
}

module.exports = {
    usersByTrainingController
}