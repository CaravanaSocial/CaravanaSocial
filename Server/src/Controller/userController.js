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

const getUsersController = async () =>{
    const users = await user.findAll()
    if(users.length > 0){
        for(let i = 0; i<users.length ; i++){
            users[i].password=0
        } return users
    }throw Error("There is no users")
}

const updateUserController = async (props, id) =>{
    const updated = await user.update(props,{
        where : {id}
    })
    //Eliminar y volver a relacionar con el rubro.
    if(updated){
        const updatedUser = user.findOne({where:{id}})
        return updatedUser
    }throw Error("Something went wrong")
}
module.exports={
    getUserAccController,
    createUserAccController,
    getUsersController,
    updateUserController
}