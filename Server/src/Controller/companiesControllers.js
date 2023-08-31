const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {companies} = require("../db")
const {areaTraining} = require("../db")
const {SIGNATURE} = process.env

const getCompanyAccController = async (email) =>{
    const companyAcc = await companies.findOne({where: {email}})
    return companyAcc
}

const createCompanyAccController = async (props) =>{
    const {password, email, category} = props
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const [newCompany, created] = await companies.findOrCreate({
        where: {email},
        defaults: {...props, password: hashedPassword}
    })

    if(created){
        //CREAR LA RELACIÓN CON EL RUBRO
        /* for(let i =0 ; i<category;i++){
            const categoryId = (await areaTraining.findOne({
                where:{
                    name: category[i]
                }
            })).id
            await newCompany.addRubro(categoryId)
        }
        const returning = await companies.findOne({
            where: {
                id:newCompany.id
            },
            include: [
                {
                    model: areaTraining,
                    attributes: ["name"],
                    through:{attributes:[]}
                }
            ]
        }) */ //Descomentar y en acc:returning

        const companyId = newCompany.id
        const token = jwt.sign({companyId},SIGNATURE)
        returning.password=0
        console.log("prototipos", newCompany.__proto__);
        return {acc:newCompany, token}
    }
    return "used"
}

const getCompaniesController = async () =>{
    const gotCompanies = await companies.findAll()
    if(gotCompanies.length >0){
        for(let i = 0; i<gotCompanies.length ; i++){
            gotCompanies[i].password=0
        } return gotCompanies
    }throw Error("There is no companies")
}

const updateCompanyController = async (props, id) =>{
    const updated = await companies.update(props,{
        where : {id}
    })
    //Eliminar y volver a relacionar con el rubro.
    if(updated){
        const updatedCompany = companies.findOne({where:{id}})
        return updatedCompany
    }throw Error("Something went wrong")
}

module.exports={
    createCompanyAccController,
    getCompanyAccController,
    getCompaniesController,
    updateCompanyController
}