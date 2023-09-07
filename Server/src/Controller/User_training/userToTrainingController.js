const {user, training} = require('../../db')

const userToTrainingController = async(info)=>{

    const {userId, trainingId} = info

    try {
        const capacitacion = await training.findOne({where:{id:trainingId}})
        const usuario = await user.findOne({where:{id:userId}})


        capacitacion.addUser(usuario)

        return(info);
    } catch (error) {
        
    }
}

module.exports = {
    userToTrainingController
}