const { training } = require('../db')
const { companies } = require('../db')

const getCreatedTraining = async (body) => {
    try {
        const {name, description, video, companyId} = body
        if(!name || !description || !video || !companyId) return res.status(401).json({error: "Falta informacion"})
        console.log('controller')
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

// const createTraining = async (body) => {
//     try {
//         const { name, description, video, companyId } = body;


//         const newTraining = await training.create({
//             name,
//             description,
//             video
//         })

        

//         await newTraining.setCompany(companyId)

//         return newTraining;
//     } catch (error) {
//         throw error
//     }


// } 

module.exports = {
    getCreatedTraining,
    // createTraining
}