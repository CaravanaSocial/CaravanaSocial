const { success } = require("../../db");

const createSuccSto = async(body) =>{
    try {
        const { name, image, testimony } = body;
        if(!name || !image || !testimony)throw new Error("Falta informacion necesaria")
        
        const [user, created] = await success.findOrCreate({
            where:{
                name: name
            },defaults:{
                name,
                image,
                testimony
            }
        })
        
        return created
    } catch (error) {
        throw error
    }
}

module.exports = {
    createSuccSto
}