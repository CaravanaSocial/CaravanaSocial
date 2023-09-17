const { companies } = require("../../db");
const bcrypt = require("bcryptjs");



const updatePassCompanyController = async(id, oldPassword, newPassword) => {
    try {
        const foundCompanie = await companies.findByPk(id);
        const hashedPassword = foundCompanie
        .dataValues.password;
        const saltRounds = 10;
        const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);
    
        return new Promise((resolve, reject) => {
          bcrypt.compare(oldPassword, hashedPassword, async (err, result) => {
            if (err) {
              reject(err);
            } else if (result) {
              console.log("Contraseña antigua válida");
              if (newPassword) {
                const update = await companies.update({ password: newPasswordHash }, { where: { id } });
                resolve(update);
              } else {
                resolve(null);
              }
            } else {
              console.log("Contraseña antigua incorrecta");
              reject(new Error("La contraseña antigua es incorrecta"));
            }
          });
        });
      } catch (error) {
        throw error;
      }
    };



module.exports = {
    updatePassCompanyController
}