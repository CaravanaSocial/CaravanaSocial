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
    const {password, email, createKey, name} = props
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    if(createKey === CREATE_KEY){
        const [newAdmin, created] = await admin.findOrCreate({
            where: {email},
            defaults: {...props, password: hashedPassword}
        })
    
        if(created){
            const adminId = newAdmin.id
            const token = jwt.sign({adminId},SIGNATURE)
            newAdmin.password=0
            return {acc:newAdmin, token}
        }
        return "used"
    }
    return "wrongKey"
}

const getAdminsController = async () =>{
    const admins = await admin.findAll()
    if(admins.length > 0){
        for(let i = 0; i<admins.length ; i++){
            admins[i].password=0
        } 
        return admins
    }throw Error("There is no admins")
}

const updateAdminController = async (props, id) =>{
    const updated = await admin.update(props,{where:{id}})
    if(updated){
        const updatedAdmin = await admin.findOne({where:{id}})
        return updatedAdmin
    } throw Error("Something went wrong")
}

module.exports={
    createAdminAccController,
    getAdminAccController,
    getAdminsController,
    updateAdminController
}