const { getAdminAccController } = require("../Controller/adminControllers")
const { getCompanyAccController } = require("../Controller/companiesControllers")
const { getUserAccController } = require("../Controller/userController")
const {loginController} = require("../Controller/loginController")

const loginHandler = async (req, res) =>{
    const {email, password} = req.body
    try {
        //Debe consultar los 3 modelo
        const adminAcc = await getAdminAccController(email)
        if(adminAcc){
            let accTokenType = await loginController(adminAcc, password)
            if(accTokenType.acc.activate!==false){
                return res.status(200).json({...accTokenType, type:"admin"})
            }return res.status(400).json({error: "Usuario bloqueado"})
        }
        const companyAcc = await getCompanyAccController(email)
        if(companyAcc){
            let accTokenType = await loginController(companyAcc, password)
            if(accTokenType.acc.activate!==false){
                return res.status(200).json({...accTokenType, type:"company"})
            }return res.status(400).json({error: "Usuario bloqueado"})
        }
        const userAcc = await getUserAccController(email)
        if(userAcc){
            let accTokenType = await loginController(userAcc, password)
            if(accTokenType.acc.activate!==false){
                return res.status(200).json({...accTokenType, type:"user"})
            }return res.status(400).json({error: "Usuario bloqueado"})
        }
        return res.status(404).json({error: "invalid credentials"})

    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

module.exports={
    loginHandler
}