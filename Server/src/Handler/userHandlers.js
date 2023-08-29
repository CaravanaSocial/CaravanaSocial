const {user} = require('../db')

const postUser = async(req, res) => {
    const response = req.body;
    try{
        await user.findOrCreate({where:{email:response.mail}})
        res.status(200).send('The user has been created')
    }catch(error){
        res.status(500).send('Not found')

    }
}