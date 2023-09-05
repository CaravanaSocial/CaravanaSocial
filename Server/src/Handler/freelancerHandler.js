const {getFreelancerController} = require('../Controller/Freelancers/getFreelancerController')

const getFreelancerHandler = async(req, res)=>{
    try {
        const response = await getFreelancerController(req.query)
        if(response.length>0){
            console.log("Respuesta");
            res.status(200).json(response)
        }else{
            res.status(404).json({message: 'Freelancers Not Found'})
        }
    } catch (error) {
        return res.status(500).json(error)
    } 
    
}

module.exports={
    getFreelancerHandler
}
