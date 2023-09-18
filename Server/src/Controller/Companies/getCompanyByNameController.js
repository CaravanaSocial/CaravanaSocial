const { Op } = require("sequelize");
const { companies } = require("../../db");



const getCompanyByNameController = async (name) =>{
    try {
        const findCompanyByName = await companies.findAll({
            where:{
                nameCompany:{
                    [Op.iLike]: `${name}%`
                }
            }
        })
        return findCompanyByName;
    } catch (error) {
        throw error
    }
}

module.exports = {
    getCompanyByNameController
}