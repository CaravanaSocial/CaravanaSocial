const jwt = require("jsonwebtoken");
const {SIGNATURE} = process.env

const loginGoogleController = async (acc) =>{
    if(acc.verified === false){
        throw Error("Email no verificado")
    }
    const token = jwt.sign({userId: acc.id}, SIGNATURE)
    acc.password=0
    return {token, acc}
}

module.exports={
    loginGoogleController
}