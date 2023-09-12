const {companies, areaTraining, training, offer} = require("../../db")

const getCompanyByIdController = async (id) =>{
        const foundCompany = await companies.findOne({
            where: {id},
            include: [
                {
                    model: areaTraining,
                    attributes: ["name"],
                    through: {attributes:[]}
                },
                {
                    model: training,
                },
                {
                    model: offer, 
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