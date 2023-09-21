const bcrypt = require("bcryptjs");
const { user } = require("../../db");
const { updateUserController } = require("../User/updateUserController");

const updatePassUserController = async (id, oldPassword, newPassword) => {
    if(oldPassword === newPassword ){
      throw Error("No puede ser la misma contraseña")
    }
    const foundUser = await user.findByPk(id);
    const hashedPassword = foundUser.dataValues.password;

    const saltRounds = 10;
    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);


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