const {companies, areaTraining,training, offer} = require("../../db")
const { Op } = require('sequelize')

const getCompaniesController = async (value) =>{
    if(value==="deleted"){
        const deletedCompanies = await companies.findAll({
            paranoid:false,
            where: {deletedAt:{
                [Op.ne]: null
                }},
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
        if(deletedCompanies.length >0){
            for(let i = 0; i<deletedCompanies.length ; i++){
                deletedCompanies[i].password=0
            } return deletedCompanies
        }
    }else if(value!=="deleted"){
        const gotCompanies = await companies.findAll({
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
        if(gotCompanies.length >0){
            for(let i = 0; i<gotCompanies.length ; i++){
                gotCompanies[i].password=0
            } return gotCompanies
        }
    }
    throw Error("There is no companies")
}

module.exports = {
    getCompaniesController
}