const {user, areaTraining} = require("../../db")
const getUsersByIdController = async (id)=>{
    const foundUser = await user.findOne({
        where:{id},
        include: [
            {
                model: areaTraining,
                attributes: ["name"],
                through:{attributes:[]}
            }
        ]
    })
    foundUser.password=0
    if(foundUser)return foundUser
    throw Error("User not found")
}

module.exports={
    getUsersByIdController
}