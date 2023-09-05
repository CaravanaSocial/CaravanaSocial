const {createAdminAccController} = require('../Controller/Admin/createAdminAccController')
const  {getAdminsController} = require('../Controller/Admin/getAdminsController')
const  {updateAdminController} = require("../Controller/Admin/updateAdminController")
const {getAdminsByIdController} = require("../Controller/Admin/getAdminsByIdController")
const {deleteAdminController} = require("../Controller/Admin/deleteAdminController")
const {restoreAdminController} = require("../Controller/Admin/restoreAdminController")

const adminSignUpHandler = async (req, res)=>{
    try {
        const adminToken = await createAdminAccController(req.body)
        if(adminToken === "used") return res.status(400).json({error: "Used account"})
        if(adminToken === "wrongKey") return res.status(400).json({error: "Wrong create key"})

        res.status(200).json({...adminToken, type:"admin"})
    } catch (error) {
        if(error.message=== "Validation Error") return res.status(400).json({error: "Used account"})
        res.status(500).json(error.message)
    }
}

const getAdminsHandler = async (req, res) =>{
    try {
        const admins = await getAdminsController()
        res.status(200).json(admins)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const updateAdminHandler = async (req, res) =>{
    try {
        const {id} = req.params
        const updated = await updateAdminController(req.body, id)
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const getAdminsByIdHandler = async (req, res) =>{
    try {
        const {id} = req.params
        const admins = await getAdminsByIdController(id)
        res.status(200).json(admins)
    } catch (error) {
        res.status(200).json({error:error.message})
    }
}

const deleteAdminHandler = async (req, res) =>{
    try {
        const {id} = req.params
        const deleted = await deleteAdminController(id)
        if(deleted) return res.status(200).json({message: deleted})
        return res.status(400).json({error: "Admin not found"})
    } catch (error) {
        res.status(200).json({error:error.message})
    }
}

const restoreAdminHandler = async (req, res) => {
    try {
        const {id} = req.params
        const restored = await restoreAdminController(id)
        if(restored) return res.status(200).json(restored)
        return res.status(400).json({error: "Admin not found"})
    } catch (error) {
        res.status(200).json({error:error.message})
    }
}

module.exports={
    adminSignUpHandler,
    getAdminsHandler,
    updateAdminHandler,
    getAdminsByIdHandler,
    deleteAdminHandler,
    restoreAdminHandler
}