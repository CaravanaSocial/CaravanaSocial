const jwt = require("jsonwebtoken");
const {SIGNATURE} = process.env

const loginGoogleController = async (acc) =>{
    const token = jwt.sign({userId: acc.id}, SIGNATURE)
    acc.password=0
    return {token, acc}
}

module.exports={
    loginGoogleController
}