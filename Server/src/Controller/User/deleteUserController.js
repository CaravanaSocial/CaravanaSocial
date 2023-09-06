const {user} = require("../../db")

const deleteUserController = async (id) =>{
    const deleted = await user.destroy({
        where: {id}
    })
    if(deleted === 1) return "Cuenta de usuario eliminada con éxito"
    throw Error("No se pudo eliminar la cuenta")
}

module.exports={
    deleteUserController
}