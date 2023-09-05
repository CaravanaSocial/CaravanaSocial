const {companies} = require("../../db")

const deleteCompanyController = async (id) =>{
    const deleted = await companies.destroy({
        where: {id}
    })
    if(deleted === 1) return "Cuenta de empresa eliminada con éxito"
    throw Error("No se pudo eliminar la cuenta")
}

module.exports={
    deleteCompanyController
}