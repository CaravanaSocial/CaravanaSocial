const {user} = require("../../db")
const {areaTraining} = require("../../db")



const getUsersController = async () =>{
    const users = await user.findAll({
        include: [
            {
                model: areaTraining,
                attributes: ["name"],
                through:{attributes:[]}
            }
        ]
    })
    if(users.length > 0){
        for(let i = 0; i<users.length ; i++){
            users[i].password=0
        } return users
    }throw Error("There is no users")
}

module.exports = {
    getUsersController
}