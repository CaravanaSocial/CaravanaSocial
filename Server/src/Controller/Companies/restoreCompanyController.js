const {companies} = require("../../db")

const restoreCompanyController = async (id) =>{
    const restored = await companies.restore({
        where: {id}
    })
    if(restored === 1) return "Cuenta de empresa restaurada con éxito"
    throw Error("No se pudo restaurar la cuenta")
}

module.exports={
    restoreCompanyController
}