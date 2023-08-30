const {createUserAccController} = require("../Controller/userController")
const {getCompanyAccController} = require("../Controller/companiesControllers")
const userSignUpHandler = async (req, res)=>{
    try {
        const findAcc = await getCompanyAccController(req.body.email)
        if(findAcc) res.status(400).json({error: "Email in use"})

        const userToken = await createUserAccController(req.body)
        if(userToken === "used") return res.status(400).json({error: "Email in use"})
        res.status(200).json(userToken)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports={
    userSignUpHandler
}