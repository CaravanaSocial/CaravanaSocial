const {admin, training, offer} = require("../../db")

const getAdminsByIdController = async (id) =>{
    const foundAdmin = await admin.findOne({
        where: {id},
        include:[
            {
                model:training
            },
            {
                model:offer
            }

        ]
    })
    foundAdmin.password=0
    if(foundAdmin) return foundAdmin
    throw Error("Admin not found")
}

module.exports={
    getAdminsByIdController
}