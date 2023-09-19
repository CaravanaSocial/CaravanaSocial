const {createCompanyAccController} = require("../Controller/Companies/createCompanyAccController")
const {getCompaniesController} = require("../Controller/Companies/getCompaniesController")
const {updateCompanyController} = require("../Controller/Companies/updateCompanyController")
const {getUserAccController} = require("../Controller/User/getUserAccController")
const {getCompanyByIdController} = require("../Controller/Companies/getCompanyByIdController")
const {deleteCompanyController} = require("../Controller/Companies/deleteCompanyController")
const {restoreCompanyController} = require("../Controller/Companies/restoreCompanyController")
const { getCompanyByNameController } =  require("../Controller/Companies/getCompanyByNameController") 
const { updatePassCompanyController } = require("../Controller/Companies/updatePassCompanyController")


const companiesSignUpHandler = async (req, res)=>{
    try {
        const findAcc = await getUserAccController(req.body.email)
        if(findAcc) res.status(400).json({error: "Email in use"})

        const companyToken = await createCompanyAccController(req.body)
        if(companyToken === "used") return res.status(400).json({error: "Email in use"})
        return res.status(200).json({...companyToken, type: "company"})
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const getCompaniesHandler = async (req, res) =>{
    try {
        const {value} = req.query
        const companies = await getCompaniesController(value)
        return res.status(200).json(companies)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const updateCompanyHandler = async (req, res) =>{
    try {
        const {id} = req.params
        const updated = await updateCompanyController(req.body, id)
        return res.status(200).json(updated)
    } catch (error) {
        return res.status(500).json( {error: error.message})
    }    
}

const getCompanyByIdHandler = async (req, res) =>{
    try {
        const {id} = req.params 
        const company = await getCompanyByIdController(id)
        return res.status(200).json(company)
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
}

const deleteCompanyHandler = async (req, res) =>{
    try {
        const {id} = req.params
        const deleted = await deleteCompanyController(id)
        if(deleted) return res.status(200).json({message: deleted})
        return res.status(400).json({error: "Company not found"})
    } catch (error) {
        return res.status(200).json({error:error.message})
    }
}

const restoreCompanyHandler = async (req, res) => {
    try {
        const {id} = req.params
        const restored = await restoreCompanyController(id)
        if(restored) return res.status(200).json(restored)
        return res.status(400).json({error: "Company not found"})
    } catch (error) {
        return res.status(200).json({error:error.message})
    }
}

const getCompanyByNameHandler = async (req, res) => {
    try {
        const { name } =  req.query;

        const response = await getCompanyByNameController(name);
        
        return res.status(200).json(response);

    } catch (error) {
        return res.status(400).send(error.message)
    }
}

const updatePassCompanyHandler =  async (req, res)=> {
    try {
        const { oldPassword, newPassword } = req.body;
        const { id } = req.params;
        
        const response = await updatePassCompanyController(id, oldPassword, newPassword);
        console.log("HOla"+ response)
        return res.status(200).send("Se ha cambiado exitosamente la contraseña")

    } catch (error) {
        return res.status(400).send(error.message)
    }
}

module.exports={
    companiesSignUpHandler,
    getCompaniesHandler,
    updateCompanyHandler,
    getCompanyByIdHandler,
    deleteCompanyHandler,
    restoreCompanyHandler,
    getCompanyByNameHandler,
    updatePassCompanyHandler
}