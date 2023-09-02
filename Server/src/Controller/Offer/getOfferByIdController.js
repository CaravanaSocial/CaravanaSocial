const { offer, companies, areaTraining } = require("../../db");

const getOfferByIdController = async (id) => {
  const foundOffer = await offer.findOne({
    where: { id },
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
        model: areaTraining,
        attributes: ["name"],
        through: { attributes: [] },
      },
    ],
    attributes: ["title"],
    through: { attributes: [] },
  });

  if (foundOffer) return foundOffer;
  throw Error("Offer not found");
};

module.exports = {
  getOfferByIdController,
};
