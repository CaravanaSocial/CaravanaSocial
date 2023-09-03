const { training } = require('../../db');


const getCreatedTraining = async (body, id) => {
    try {
        const {name, description, video} = body

        const [user,created] = await training.findOrCreate({
            where:{
                video: video
            },defaults:{
                name,
                description,
                video
            }
        })
        await user.setCompany(id)
        return user

    } catch (error) {
        console.log(error);
        throw error
    }
}

module.exports = {
    getCreatedTraining
}