const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {user} = require("../db")
const {SIGNATURE} = process.env


const getUserAccController = async (email) =>{
    const userAcc = await user.findOne({where : {email}})
    return userAcc
}

const createUserAccController = async (props) =>{
    const {password, email} = props
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const [newUser, created] = await user.findOrCreate({
        where: {email},
        defaults: {...props, password: hashedPassword}
    })

    if(created){
        //CREAR LA RELACIÓN CON EL PAIS
        const userId = newUser.id
        const token = jwt.sign({userId},SIGNATURE)
        newUser.password=0
        return {acc:newUser, token}
    }
    return "used"
}

module.exports={
    getUserAccController,
    createUserAccController
}