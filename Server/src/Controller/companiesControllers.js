const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {companies} = require("../db")
const {SIGNATURE} = process.env

const getCompanyAccController = async (email) =>{
    const companyAcc = await companies.findOne({where: {email}})
    return companyAcc
}

const createCompanyAccController = async (props) =>{
    const {password, email} = props
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const [newCompany, created] = await companies.findOrCreate({
        where: {email},
        defaults: {...props, password: hashedPassword}
    })

    if(created){
        //CREAR LA RELACIÓN CON EL RUBRO
        const companyId = newCompany.id
        const token = jwt.sign({companyId},SIGNATURE)
        newCompany.password=0
        return {acc:newCompany, token}
    }
    return "used"
}

const getCompaniesController = async () =>{
    const gotCompanies = await companies.findAll()
    if(gotCompanies >0){
        return gotCompanies
    }throw Error("There is no companies")
}

const updateCompanyController = async (props) =>{

}

module.exports={
    createCompanyAccController,
    getCompanyAccController,
    getCompaniesController,
    updateCompanyController
}