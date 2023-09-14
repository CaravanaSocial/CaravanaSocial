const { admin, training, offer} = require("../../db");

const getAdminAccController = async (email) => {
  const adminAcc = await admin.findOne({ where: { email },
    include:[
      {
          model:training
      },
      {
          model:offer
      }

  ]});
  return adminAcc;
};

module.exports = {
  getAdminAccController,
};
