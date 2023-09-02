const {admin} = require("../../db")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {SIGNATURE} = process.env
const {CREATE_KEY} = process.env

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

module.exports = {
    createAdminAccController
}