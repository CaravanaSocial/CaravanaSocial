const {admin} = require("../../db")

const restoreAdminController = async (id) =>{
    const restored = await admin.restore({
        where: {id}
    })
    if(restored === 1) return "Administrador restaurado con éxito"
    throw Error("No se pudo restaurar la cuenta")
}

module.exports={
    restoreAdminController
}