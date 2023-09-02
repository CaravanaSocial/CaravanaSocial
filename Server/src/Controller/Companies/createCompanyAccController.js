const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {companies} = require("../../db")
const {areaTraining} = require("../../db")
const {SIGNATURE} = process.env

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

module.exports = {
    createCompanyAccController
}