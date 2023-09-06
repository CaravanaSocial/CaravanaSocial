const {user} = require("../../db")
const {areaTraining} = require("../../db")


const updateUserController = async (props, id) =>{
    const {category} = props
    const updated = await user.update(props,{
        where : {id}
    })
    
    if(updated){
        if(category){
            const updatedUser = await user.findByPk(id)
            await updatedUser.setAreaTrainings([]);
            for(let i =0; i<category.length; i++){
                const newCategory = (await areaTraining.findOne({
                    where:{
                        name: category[i]
                    }
                }))
                await updatedUser.addAreaTraining(newCategory)
            }
        }
        const updatedUser = user.findOne({where:{id}})
        return updatedUser
    }throw Error("Something went wrong")
}

module.exports = {
    updateUserController
}