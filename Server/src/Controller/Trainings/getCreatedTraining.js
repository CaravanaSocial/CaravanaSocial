const { training } = require('../../db');


const getCreatedTraining = async (body) => {
    try {
        const {name, description, video, companyId} = body
        if(!name || !description || !video || !companyId) return res.status(400).json({error: "Falta informacion"})
        console.log(video[0])

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
        console.log(error);
        throw error
    }
}

module.exports = {
    getCreatedTraining
}