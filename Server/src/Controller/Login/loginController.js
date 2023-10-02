const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {SIGNATURE} = process.env

const loginController = async (acc, password, typeAcc) =>{
    console.log("EMAILL:",acc.email);
    const validPassword = await bcrypt.compare(password, acc.password)
    if(!validPassword) {
        throw Error("Credenciales inválidas")
    }
    if(acc.verified === false){
        throw Error("Email no verificado")
    }

    const token = jwt.sign({
        userId: acc.id,
        type: typeAcc
    }, SIGNATURE)
    acc.password=0
    return {token, acc}
}

module.exports= {
    loginController
}