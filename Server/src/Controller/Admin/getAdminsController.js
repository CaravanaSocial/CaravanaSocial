const {admin, training, offer} = require("../../db")
const { Op } = require('sequelize')

const getAdminsController = async (value) =>{
    if(value === "deleted"){
        const adminsDeleted = await admin.findAll({
            paranoid: false,
            where: {deletedAt:{
                [Op.ne]: null
                }},
            include:[
                {
                    model:training
                },
                {
                    model:offer
                }
    
            ]
        })
        if(adminsDeleted.length > 0){
            for(let i = 0; i<adminsDeleted.length ; i++){
                adminsDeleted[i].password=0
            } 
            return adminsDeleted
        }throw Error("There is no admins deleted")
    }else if(value!=="deleted"){
        const admins = await admin.findAll({
            include:[
                {
                    model:training
                },
                {
                    model:offer
                }
    
            ]
        })
        if(admins.length > 0){
            for(let i = 0; i<admins.length ; i++){
                admins[i].password=0
            } 
            return admins
        }throw Error("There is no admins")
    }
}

module.exports = {
    getAdminsController
}