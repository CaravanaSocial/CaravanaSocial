const {user} = require("../../db")

const restoreUserController = async (id) =>{
    const restored = await user.restore({
        where: {id}
    })
    if(restored === 1) return "Cuenta de usuario restaurada con éxito"
    throw Error("No se pudo restaurar la cuenta")
}

module.exports={
    restoreUserController
}