const { success } = require("../../db");

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

 module.exports = {
    changeStory
 }