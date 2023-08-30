const {createCompanyAccController} = require("../Controller/companiesControllers")
const {getUserAccController} = require("../Controller/userController")
const companiesSignUpHandler = async (req, res)=>{
    try {
        const findAcc = await getUserAccController(req.body.email)
        if(findAcc) res.status(400).json({error: "Email in use"})

        const companyToken = await createCompanyAccController(req.body)
        if(companyToken === "used") if(userToken === "used") return res.status(400).json({error: "Email in use"})
        res.status(200).json(userToken)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports={
    companiesSignUpHandler
}