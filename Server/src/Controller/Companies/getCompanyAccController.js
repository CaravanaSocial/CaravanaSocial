const {companies} = require("../../db")
const {areaTraining, training, offer} = require("../../db")

const getCompanyAccController = async (email) =>{
    const companyAcc = await companies.findOne({where: {email},
        include: [
            {
                model: areaTraining,
                attributes: ["name"],
                through:{attributes:[]}
            },
            {
                model: training,
            },
            {
                model: offer, 
            }
            
        ]})
    return companyAcc
}

module.exports = {
    getCompanyAccController
}