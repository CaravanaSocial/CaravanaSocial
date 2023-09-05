const { success } = require("../../db");
const { uploadImage } = require('../../Handler/imageHandler')

const createSuccSto = async(body) =>{
    try {
        const { name, image, testimony } = body;
        if(!name || !image || !testimony)throw new Error("Falta informacion necesaria")

        const realImage = uploadImage(image)
        
        const [user, created] = await success.findOrCreate({
            where:{
                name: name
            },defaults:{
                name,
                realImage,
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