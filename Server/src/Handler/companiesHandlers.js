const {createCompanyAccController} = require("../Controller/Companies/createCompanyAccController")
const {getCompaniesController} = require("../Controller/Companies/getCompaniesController")
const {updateCompanyController} = require("../Controller/Companies/updateCompanyController")
const {getUserAccController} = require("../Controller/User/getUserAccController")

const companiesSignUpHandler = async (req, res)=>{
    try {
        const findAcc = await getUserAccController(req.body.email)
        if(findAcc) res.status(400).json({error: "Email in use"})

        const companyToken = await createCompanyAccController(req.body)
        if(companyToken === "used") return res.status(400).json({error: "Email in use"})
        res.status(200).json({...companyToken, type: "company"})
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const getCompaniesHandler = async (req, res) =>{
    try {
        const companies = await getCompaniesController()
        res.status(200).json(companies)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const updateCompanyHandler = async (req, res) =>{
    try {
        const {id} = req.params
        const updated = await updateCompanyController(req.body, id)
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json(error.message)
    }    
}

module.exports={
    companiesSignUpHandler,
    getCompaniesHandler,
    updateCompanyHandler
}