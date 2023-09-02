const { offer } = require("../../db");

const postOfferController = async (data) => {
  const { title, description} = data;
  if (title && description) {
    const [user, created] = await offer.findOrCreate({
      where: { title: title },
      defaults: { title:title, description: description},
    });
    if (created) {
      return created;
    } else return created
  } else throw new Error("Info invalida o incorrecta");
};

module.exports = {
    postOfferController
}