const {user} = require("../../db")


const updateUserController = async (props, id) =>{
    const updated = await user.update(props,{
        where : {id}
    })
    //Eliminar y volver a relacionar con el rubro.
    if(updated){
        const updatedUser = user.findOne({where:{id}})
        return updatedUser
    }throw Error("Something went wrong")
}

module.exports = {
    updateUserController
}