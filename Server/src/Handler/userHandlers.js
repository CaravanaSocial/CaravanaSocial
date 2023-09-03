const {createUserAccController} = require("../Controller/User/createUserAccController")
const {getUsersController}= require("../Controller/User/getUsersController")
const {updateUserController} = require("../Controller/User/updateUserController")
const {getCompanyAccController} = require("../Controller/Companies/getCompanyAccController")
const {getUsersByIdController} = require("../Controller/User/getUsersByIdController")
const {getFreelancersController} = require("../Controller/User/getFreelancersController")

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
        res.status(500).json({error:error.message})
    } 
}

const getUsersByIdHandler = async (req, res) =>{
    try {
        const {id} = req.params
        const user = await getUsersByIdController(id)
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const getFreelancersHandler = async (req, res) =>{
    try {
        const freelancers = await getFreelancersController()
        res.status(200).json(freelancers)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}


module.exports={
    userSignUpHandler,
    getUsersHandler,
    updateUserHandler,
    getUsersByIdHandler,
    getFreelancersHandler
}