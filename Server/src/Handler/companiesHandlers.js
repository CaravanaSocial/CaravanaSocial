const {getUserAccController, createCompanyAccController} = require("../Controller")

const userCompaniesUpHandler = async (req, res)=>{
    try {
        const findAcc = await getUserAccController(req.body.email)
        if(findAcc) res.status(400).json({error: "Email in use"})

        const userToken = await createCompanyAccController(req.body)
        res.status(200).json(userToken)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports={
    userCompaniesUpHandler
}