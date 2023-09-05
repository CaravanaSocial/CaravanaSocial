const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {companies} = require("../../db")
const {SIGNATURE} = process.env
const {areaTraining} = require("../../db")

const createCompanyAccController = async (props) =>{
    const {password, email, category} = props
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const defaultProfilePicture = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png"
    const [newCompany, created] = await companies.findOrCreate({
        where: {email},
        defaults: {...props, password: hashedPassword, profilePicture: defaultProfilePicture}
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

/*         const companyId = newCompany.id
        const token = jwt.sign({companyId},SIGNATURE) */
        returning.password=0
        return {acc:returning/* , token */}
    }
    return "used"
}

module.exports = {
    createCompanyAccController
}