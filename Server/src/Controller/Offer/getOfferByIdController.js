const { offer, companies, areaTraining, admin } = require("../../db");

const getOfferByIdController = async (title) => {
  const foundOffer = await offer.findOne({
    where: {title:title},
    include: [
      {
        model: companies,
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: areaTraining,
            attributes: ["name"],

            through: { attributes: [] },
          },
        ],
      },
      {
        model: admin,
      },
      {
        model: areaTraining,
        attributes: ["name"],
        through: { attributes: [] },
      },
    ],
  });

  if (foundOffer) return foundOffer;
  throw Error("Offer not found");
};

module.exports = {
  getOfferByIdController,
};
