const {admin} = require("../../db")

const deleteAdminController = async (id) =>{
    const deleted = await admin.destroy({
        where: {id}
    })
    if(deleted === 1) return "Administrador eliminado con éxito"
    throw Error("No se pudo eliminar")
}

module.exports={
    deleteAdminController
}