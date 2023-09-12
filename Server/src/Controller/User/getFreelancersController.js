const {user, areaTraining, training} = require("../../db")

const getFreelancersController = async () =>{
    const freelancers = await user.findAll({
        where:{
            freelancer:true
        },
        include: [
            {
                model: areaTraining,
                attributes: ["name"],
                through:{attributes:[]}
            },
            {
                model:training
            }
        ]

    })
    if(freelancers.length >0) return freelancers
    throw Error("There is no freelancers")
}

module.exports={
    getFreelancersController
}