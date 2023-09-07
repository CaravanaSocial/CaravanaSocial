const { uploadImage } = require('../Tools/imageCloudinary')

const uploadImageHandler = async (req, res) => {
   
    try {
        const { image } = req.body;
        const imageNice = await uploadImage(image)

        return res.status(200).json(imageNice)
    } catch (error) {
        console.log(error.message + "Hola");
        return res.status(400).send(error.message)
    }


}

module.exports = {
    uploadImageHandler
}