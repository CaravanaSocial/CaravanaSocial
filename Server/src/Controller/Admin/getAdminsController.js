const {admin} = require("../../db")

const getAdminsController = async () =>{
    const admins = await admin.findAll()
    if(admins.length > 0){
        for(let i = 0; i<admins.length ; i++){
            admins[i].password=0
        } 
        return admins
    }throw Error("There is no admins")
}

module.exports = {
    getAdminsController
}