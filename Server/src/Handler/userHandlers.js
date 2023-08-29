const {user} = require('../db')
const {getUserController} = require('../Controller/userController')

const getUser = async(req, res) => {
    try{
        res.status(200).send('Response')
    }catch(error){
        res.status(500).send('Request error')

    }
}

module.exports = {
    getUser
}