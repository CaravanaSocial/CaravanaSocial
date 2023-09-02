const {user} = require("../../db")

const getUserAccController = async (email) =>{
    const userAcc = await user.findOne({where : {email}})
    return userAcc
}

module.exports ={
    getUserAccController
}