const {companies} = require("../../db")
const {areaTraining} = require("../../db")


const updateCompanyController = async (props, id) =>{
    const {category} = props
    const updated = await companies.update(props,{
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
            }
        ]})
        return updatedCompany
    }throw Error("Something went wrong")
}

module.exports = {
    updateCompanyController
}