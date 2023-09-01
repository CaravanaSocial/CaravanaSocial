const {createUserAccController, getUsersController, updateUserController} = require("../Controller/userController")
const {getCompanyAccController} = require("../Controller/companiesControllers")
const userSignUpHandler = async (req, res)=>{
    try {
        const findAcc = await getCompanyAccController(req.body.email)
        if(findAcc) return res.status(400).json({error: "Email in use"})

        const userToken = await createUserAccController(req.body)
        if(userToken === "used") return res.status(400).json({error: "Email in use"})
        return res.status(200).json({...userToken, type: "user"})
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const getUsersHandler = async (req, res) =>{
    try {
        const users = await getUsersController()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const updateUserHandler = async (req, res) =>{
    try {
        const {id} = req.params
        const updated = await updateUserController(req.body, id)
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json(error.message)
    } 
}


module.exports={
    userSignUpHandler,
    getUsersHandler,
    updateUserHandler
}