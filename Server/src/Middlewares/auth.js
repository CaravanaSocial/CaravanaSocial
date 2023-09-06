const {jwt} = require("jsonwebtoken")
const {SIGNATURE} = process.env

const auth = async (req, res, next) =>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500; // Si es token cuenta custom es true

        let decodedData
        if(token && isCustomAuth){
            //Si la cuenta es custom
            decodedData = jwt.verify(token,SIGNATURE)
            req.accId = decodedData?.id
        }else{
            //Si es cuenta de google
            decodedData = jwt.decode(token)
            req.accId =  decodedData?.sub
        }
        next();
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports = {
    auth
}