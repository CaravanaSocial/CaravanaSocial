const { training } = require('../../db');


const delTrainingController = (id) => {
    const trainingToDelete = training.destroy({
        where:{
            id: id
        }
    })
    return trainingToDelete
}

module.exports = {
    delTrainingController
}