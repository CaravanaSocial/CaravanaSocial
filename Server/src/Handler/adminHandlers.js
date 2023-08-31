const {createAdminAccController} = require("../Controller/adminControllers")

const adminSignUpHandler = async (req, res)=>{
    try {
        const adminToken = await createAdminAccController(req.body)
        if(adminToken === "used") return res.status(400).json({error: "Used account"})
        if(adminToken === "wrongKey") return res.status(400).json({error: "Wrong create key"})

        res.status(200).json({...adminToken, type:"admin"})
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const getAdminsHandler = async (req, res) =>{

}

const updateAdminHandler = async (req, res) =>{

}

module.exports={
    adminSignUpHandler,
    getAdminsHandler,
    updateAdminHandler
}