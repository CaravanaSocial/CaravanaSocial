const {user} = require("../../db")
const {areaTraining} = require("../../db")
const bcrypt = require("bcryptjs");

const updateUserController = async (props, id) =>{
    const {category, password} = props
    const saltRounds = 10;
    const foundUser = await user.findByPk(id);
    const oldPassword = foundUser.dataValues.password;

    if(password){
        const validPassword = await bcrypt.compare(password, oldPassword)
        if(validPassword){
            throw Error("La contraseña es igual a la anterior")
        }
    }

    const hashedPassword = props?.password ? await bcrypt.hash(props.password, saltRounds) : null
    const updated = await user.update(
        password ? {...props,password : hashedPassword}: props,
        {where : {id}})
    
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