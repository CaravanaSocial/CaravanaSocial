const { offer } = require("../../db");

const deleteOfferController = async (id) => {
  if (id) {
    const data = await offer.destroy({ where: { id: id } });
    return true;
  } else return false;
};

module.exports = {
  deleteOfferController,
};
