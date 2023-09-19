const {companies} = require("../../db")
const {areaTraining, training, offer} = require("../../db")
const bcrypt = require("bcryptjs");


const updateCompanyController = async (props, id) =>{
    const {password, category} = props
    const saltRounds = 10;
    const foundCompany = await companies.findByPk(id)
    const oldPassword = foundCompany.dataValues.password;
    if(password){
        const validPassword = await bcrypt.compare(password, oldPassword)
        if(validPassword){
            throw Error("La contraseña es igual a la anterior");
        }
    }
    const hashedPassword = props?.password ? await bcrypt.hash(props.password, saltRounds) : null
    const updated = await companies.update(
        password ? {...props,password : hashedPassword}: props,{
        where : {id}
    })
    //Eliminar y volver a relacionar con el rubro.
    if(updated){
        if(category){
            const company = await companies.findByPk(id)
            await company.setAreaTrainings([]);
            for(let i =0; i<category.length; i++){
                const newCategory = (await areaTraining.findOne({
                    where:{
                        name: category[i]
                    }
                }))
                await company.addAreaTraining(newCategory)
            }
        }
        const updatedCompany = companies.findOne({where:{id},
            include: [
            {
                model: areaTraining,
                attributes: ["name"],
                through:{attributes:[]}
            },
            {
                model: training,
            },
            {
                model: offer, 
            }
        ]})
        return updatedCompany
    }throw Error("Something went wrong")
}

module.exports = {
    updateCompanyController
}