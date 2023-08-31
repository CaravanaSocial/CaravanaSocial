const {
  //   filterCountryController,
  //   filterGetallCountries,
} = require("../Controller/filterCountryController");

const { country, state } = require("../db");

const finterCountryHandler = async (req, res) => {
  const { name } = req.query;
  try {
    const response = await country.findOne({
      where: { name: name },
      include: [
        { model: state, attributes: ["name"], through: { attributes: [] } },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  //   const { name } = req.query;
  //   try {
  //     if (name) {
  //       const response = await filterCountryController(name);
  //       res.status(200).send(response);
  //     }
  //     const response = await filterGetallCountries();
  //     res.status(200).send(response);
  //   } catch (error) {
  //     error.message;
  //   }
};

module.exports = {
  finterCountryHandler,
};
