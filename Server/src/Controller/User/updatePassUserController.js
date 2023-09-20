const bcrypt = require("bcryptjs");
const { user } = require("../../db");
const { updateUserController } = require("../User/updateUserController");

const updatePassUserController = async (id, oldPassword, newPassword) => {
    
    const foundUser = await user.findByPk(id);
    const hashedPassword = foundUser.dataValues.password;
    console.log(foundUser);
    const saltRounds = 10;
    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);
    console.log(oldPassword)
    console.log(hashedPassword)

    const validPassword = await bcrypt.compare(oldPassword, hashedPassword)
    if(!validPassword){
      throw Error("La contraseña nueva es igual a la anterior");
    }

    const update = await user.update({ password: newPasswordHash }, { where: { id } });
    return update


};


module.exports = {
    updatePassUserController,
}