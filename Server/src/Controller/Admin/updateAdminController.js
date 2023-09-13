const {admin, training, offer} = require("../../db")

const updateAdminController = async (props, id) =>{
    const updated = await admin.update(props,{where:{id}})
    if(updated){
        const updatedAdmin = await admin.findOne({where:{id},
            include:[
                {
                    model:training
                },
                {
                    model:offer
                }

            ]})
        return updatedAdmin
    } throw Error("Something went wrong")
}

module.exports = {
    updateAdminController
}