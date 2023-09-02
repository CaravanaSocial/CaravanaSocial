const { training } = require('../../db');


const delTraining = (id) => {
    const trainingToDelete = training.destroy({
        where:{
            id: id
        }
    })
    return trainingToDelete
}

module.exports = {
    delTraining
}