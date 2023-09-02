const { success } = require("../../db");

const delSuc = async ( id ) => {
    try {
        const deleteSuc = success.destroy({
            where:{
                id
            }
        })
    
        return deleteSuc
    } catch (error) {
        throw error
    }
}

module.exports = {
    delSuc
}