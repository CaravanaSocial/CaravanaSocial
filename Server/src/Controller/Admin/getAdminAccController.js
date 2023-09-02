const {admin} = require("../../db")

const getAdminAccController = async (email) =>{
    console.log("controller", email)
    const adminAcc = await admin.findOne({where:{email}})
    return adminAcc
}

module.exports = {
    getAdminAccController
}