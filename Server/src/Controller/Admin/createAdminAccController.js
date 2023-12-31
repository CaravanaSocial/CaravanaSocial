const {admin, training, offer} = require("../../db")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {SIGNATURE} = process.env
const {CREATE_KEY} = process.env

const createAdminAccController = async (props) =>{
    const {password, email, createKey, name} = props
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const defaultProfilePicture = "https://res.cloudinary.com/da785kmjd/image/upload/v1695009407/unnamed_fum3we.png"
    if(createKey === CREATE_KEY){
        const [newAdmin, created] = await admin.findOrCreate({
            where: {email},
            defaults: {...props, password: hashedPassword, profilePicture: defaultProfilePicture}
        })
    
        if(created){
            /* const adminId = newAdmin.id
            const token = jwt.sign({adminId},SIGNATURE) */
            newAdmin.password=0
            const newAdminFound = await admin.findOne({
                where:{id: newAdmin.id},
                include:[
                    {
                        model:training
                    },
                    {
                        model:offer
                    }

                ]
            })

            return {acc:newAdminFound/* , token */}
        }
        return "used"
    }
    return "wrongKey"
}

module.exports = {
    createAdminAccController
}