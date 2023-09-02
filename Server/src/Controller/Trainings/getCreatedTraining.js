const { training } = require('../../db');


const getCreatedTraining = async (body) => {
    try {
        const {name, description, video, companyId} = body
        if(!name || !description || !video || !companyId) return res.status(400).json({error: "Falta informacion"})
        console.log(video)

        const [user,created] = await training.findOrCreate({
            where:{
                video: video
            },defaults:{
                name,
                description,
                video
            }
        })
        await user.setCompany(companyId)
        return created

    } catch (error) {
        throw error
    }
}

module.exports = {
    getCreatedTraining
}