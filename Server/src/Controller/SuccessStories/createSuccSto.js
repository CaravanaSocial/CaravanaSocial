const { success } = require("../../db");
const { uploadImage } = require('../../Tools/imageCloudinary')

const createSuccSto = async(body) =>{
    try {
        const { name, image, testimony, facebook, linkedin, instagram, twitter } = body;
        if(!name || !image || !testimony)throw new Error("Falta informacion necesaria")
        // const realImage = uploadImage(image)
    console.log(image);
    
        const [user, created] = await success.findOrCreate({
            where:{
                name: name
            },defaults:{
                name,
                image,
                testimony,
                facebook,
                linkedin,
                instagram,
                twitter
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