const {  training } = require("../../db");

const aproveTrainingController = async (id, answer) => {
    try {

        if(answer){
            const approved = await training.update({approved : answer},{where :{id}})
            return approved
        }else{
            const declined = await training.update({approved : answer}, {where : {id}})
            return declined
        }

    } catch (error) {
        throw error
    }
}


module.exports = {
    aproveTrainingController
}