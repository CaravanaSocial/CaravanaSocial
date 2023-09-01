const { success } = require("../db");


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

const getSuccessStories = async () => {
    try {
        const arraySuccess = success.findAll();
    
        return arraySuccess

    } catch (error) {
        throw error
    }
}

const changeStory = async (body) => {
   try {
        const { id, name, image, testimony } = body;
        if(!id || !name || !image || !testimony) throw new Error("Falta informacion")

        const foundStory = await success.findByPk(id);
        
        if(!foundStory) throw error
        console.log(foundStory);
        const newStory = {
            name :  name? name : foundStory.name,
            image :  image? image : foundStory.image,
            testimony : testimony? testimony : foundStory.testimony
        }
        await foundStory.update(newStory)

        return newStory
   } catch (error) {
    throw error
   }

}

const delSuc = async ( id ) => {
    try {
        const deleteSuc = success.destroy({
            where:{
                id
            }
        })
    
        return deleteSuc
    } catch (error) {
        throw error
    }
}

module.exports = {
    delSuc,
    changeStory,
    createSuccSto,
    getSuccessStories
}