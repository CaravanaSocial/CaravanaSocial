const { changer } = require('../Controller/patchTraining')

const updateTraining = async (req, res) => {
    try {
        console.log('nose');
        const allDone = await changer(req.body);
        console.log(allDone)

        if(!allDone) return res.status(400).send('Algo salio mal ')

        

        return res.status(200).send(allDone)
    } catch (error) {
        res.status(400).json({error:"hola"})
    }
}

module.exports = {
    updateTraining
}