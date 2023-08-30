const { getAdminAccController } = require("../Controller/adminControllers")
const { getCompanyAccController } = require("../Controller/companiesControllers")
const { getUserAccController } = require("../Controller/userController")
const {loginController} = require("../Controller/loginController")

const loginHandler = async (req, res) =>{
    try {
        const {email, password} = req.body
        //Debe consultar los 3 modelo
        const adminAcc = await getAdminAccController(email)
        if(adminAcc){
            let accTokenType = await loginController(adminAcc, password)
            return res.status(200).json({...accTokenType, type:"admin"})
        }
        const companyAcc = await getCompanyAccController(email)
        if(companyAcc){
            let accTokenType = await loginController(companyAcc, password)
            return res.status(200).json({...accTokenType, type:"company"})
        }
        const userAcc = await getUserAccController(email)
        if(userAcc){
            let accTokenType = await loginController(userAcc, password)
            return res.status(200).json({...accTokenType, type:"user"})
        }
        return res.status(404).json({error: "invalid credentials"})

    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

module.exports={
    loginHandler
}