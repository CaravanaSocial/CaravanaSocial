const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {admin} = require("../db")
const {SIGNATURE} = process.env
const {CREATE_KEY} = process.env

const getAdminAccController = async (email) =>{
    console.log("controller", email)
    const adminAcc = await admin.findOne({where:{email}})
    return adminAcc
}

const createAdminAccController = async (props) =>{
    const {password, email, createKey} = props
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)



    if(createKey === CREATE_KEY){
        const [newAdmin, created] = await admin.findOrCreate({
            where: {email},
            defaults: {email:email, password: hashedPassword}
        })
    
        if(created){
            const adminId = newAdmin.id
            const token = jwt.sign({adminId},SIGNATURE)
            return {newAdmin, token}
        }
        return "used"
    }
    return "wrongKey"
}

module.exports={
    createAdminAccController,
    getAdminAccController
}