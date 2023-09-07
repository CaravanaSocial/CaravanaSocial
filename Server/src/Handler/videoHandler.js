const { uploadFile } = require('../Controller/cloudinary/cloudinaryWidgetController')


const postVideoHandler = async (req, res) => {
    try {
        const { file } = req.body

        const filecreate = await uploadFile(file)
        return res.status(200).json(filecreate)
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

module.exports = {
    postVideoHandler
}