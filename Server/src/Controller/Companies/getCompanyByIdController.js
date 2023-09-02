const {companies, areaTraining} = require("../../db")

const getCompanyByIdController = async (id) =>{
        const foundCompany = await companies.findOne({
            where: {id},
            include: [
                {
                    model: areaTraining,
                    attributes: ["name"],
                    through: {attributes:[]}
                }
            ]
        })
        foundCompany.password=0
        if(foundCompany) return foundCompany
        throw Error("Company not found")
}


module.exports={
    getCompanyByIdController
}