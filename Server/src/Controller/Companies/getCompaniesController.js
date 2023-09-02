const {companies} = require("../../db")

const getCompaniesController = async () =>{
    const gotCompanies = await companies.findAll()
    if(gotCompanies.length >0){
        for(let i = 0; i<gotCompanies.length ; i++){
            gotCompanies[i].password=0
        } return gotCompanies
    }throw Error("There is no companies")
}

module.exports = {
    getCompaniesController
}