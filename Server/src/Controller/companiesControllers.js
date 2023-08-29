const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {companies} = require("../db")

const getCompanyAccController = async (props) =>{
    const {password, email} = props
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const [newCompany, created] = await companies.findOrCreate({
        where: {email},
        defaults: {...props, password: hashedPassword}
    })

    if(created){
        const companyId = newCompany.id
        const token = jwt.sign({companyId},"Caravana")
        return {newCompany, token}
    }
    return false
}

const createCompanyAccController = () =>{

}

module.exports={

}