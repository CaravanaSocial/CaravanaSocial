const {user, training} = require("../../db")
const {areaTraining} = require("../../db")
const { Op } = require('sequelize')

const getUsersController = async (value) =>{

     if(value === "deleted"){
                const usersDeleted = await user.findAll({
                    paranoid:false,
                    where: {deletedAt:{
                        [Op.ne]: null
                      }},
                    include: [
                        {
                            model: areaTraining,
                            attributes: ["name"],
                            through:{attributes:[]}
                        },
                        {
                            model: training
                        }
                    ]
                })
                return usersDeleted
     }else if(value!=="deleted"){
        const users = await user.findAll({
            include: [
                {
                    model: areaTraining,
                    attributes: ["name"],
                    through:{attributes:[]}
                },
                {
                    model: training
                }
            ]
        })
        if(users.length > 0){
            for(let i = 0; i<users.length ; i++){
                users[i].password=0
                console.log(users[i].deletedAt);
            }
        return users;
     }
    }return []
    
}

module.exports = {
    getUsersController
}