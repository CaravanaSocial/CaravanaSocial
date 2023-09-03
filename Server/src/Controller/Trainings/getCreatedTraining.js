const { where } = require('sequelize');
const { training, companies, areaTraining } = require('../../db');


const createdTrainingController = async (body, companyId) => {
    try {
        const {name, description, video, category} = body
        const { id } = companyId

        const [user,created] = await training.findOrCreate({
            where:{
                video: video
            },defaults:{
                name,
                description,
                video
            }
        })
        if(user){
            for(let i = 0; i < category.length; i++){
                const trainingCategory = await areaTraining.findOne({
                    where:{
                        name:category[i]
                    }
                })
                await user.addAreaTraining(trainingCategory)
            }
        }

        await user.setCompany(id)

        return user
    } catch (error) {
        console.log(error);
        throw error
    }
}

module.exports = {
    createdTrainingController
}