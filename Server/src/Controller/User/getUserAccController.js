const {user} = require("../../db")
const {areaTraining} = require("../../db") 

const getUserAccController = async (email) =>{
    const userAcc = await user.findOne({where : {email},
        include: [
            {
                model: areaTraining,
                attributes: ["name"],
                through:{attributes:[]}
            }
        ]})
    return userAcc
}

module.exports ={
    getUserAccController
}