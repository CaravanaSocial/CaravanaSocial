const {user, areaTraining} = require("../../db")

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
            }
        ]

    })
    if(freelancers.length >0) return freelancers
    throw Error("There is no freelancers")
}

module.exports={
    getFreelancersController
}