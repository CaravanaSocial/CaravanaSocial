const { Op } = require("sequelize")
const { user } = require("../../db")



const getUserByNameController = async (name) => {
    try {
        const findByNameUser = await user.findAll({
            where:{
                name:{
                    [Op.iLike]: `${name}%`
                }
            }
        })
        return findByNameUser
    } catch (error) {
        throw error
    }
}

module.exports = {
    getUserByNameController
}