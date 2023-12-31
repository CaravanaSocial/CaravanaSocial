const {
  filterCountryController,
} = require("../Controller/Country/filterCountryController");
const {
  filterGetallCountries,
} = require("../Controller/Country/filterGetallCountries");

const finterCountryHandler = async (req, res) => {
  const { name } = req.query;

  try {
    if (name) {
      const response = await filterCountryController(name);

      return res.status(200).send(response);
    }
    const response = await filterGetallCountries();
    return res.status(200).send(response);
  } catch (error) {
    error.message;
  }
};

module.exports = {
  finterCountryHandler,
};
