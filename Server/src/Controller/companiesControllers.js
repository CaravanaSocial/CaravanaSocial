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
        for(let i =0 ; i<category.length;i++){
            const categoryId = (await areaTraining.findOne({
                where:{
                    name: category[i]
                }
            })).id
            await newCompany.addAreaTraining(categoryId)
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
        })

        const companyId = newCompany.id
        const token = jwt.sign({companyId},SIGNATURE)
        returning.password=0
        return {acc:returning, token}
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
    const {category} = props
    const updated = await companies.update(props,{
        where : {id}
    })
    //Eliminar y volver a relacionar con el rubro.
    if(updated){
        if(category){
            const company = await companies.findByPk(id)
            await company.setAreaTrainings([]);
            for(let i =0; i<category.length; i++){
                const newCategory = (await areaTraining.findOne({
                    where:{
                        name: category[i]
                    }
                }))
                await company.addAreaTraining(newCategory)
            }
        }
        const updatedCompany = companies.findOne({where:{id},
            include: [
            {
                model: areaTraining,
                attributes: ["name"],
                through:{attributes:[]}
            }
        ]})
        return updatedCompany
    }throw Error("Something went wrong")
}

module.exports={
    createCompanyAccController,
    getCompanyAccController,
    getCompaniesController,
    updateCompanyController
}