const {companies} = require("../../db")

const getCompanyAccController = async (email) =>{
    const companyAcc = await companies.findOne({where: {email}})
    return companyAcc
}

module.exports = {
    getCompanyAccController
}