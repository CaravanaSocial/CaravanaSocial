const { Op, where } = require("sequelize")
const { user } = require("../../db")



const getUserByNameController = async (name) => {
    try {
        if(name){
        const findByNameUser = await user.findAll({
            where:{
                freelancer:true,
                [Op.or] : [
                    {name:{[Op.iLike]: `%${name}%`}},
                    {description:{[Op.iLike]: `%${name}%` }}
                ]
            }
        })
        return findByNameUser
        }else{
            const findByNameUser = await user.findAll({where:{freelancer:true}})
            return findByNameUser
        }
        
    } catch (error) {
        throw error
    }
}

module.exports = {
    getUserByNameController
}