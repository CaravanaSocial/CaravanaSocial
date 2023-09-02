const {companies} = require("../../db")

const getCompanyAccController = async (email) =>{
    const companyAcc = await companies.findOne({where: {email},
        include: [
            {
                model: areaTraining,
                attributes: ["name"],
                through:{attributes:[]}
            }
        ]})
    return companyAcc
}

module.exports = {
    getCompanyAccController
}