const {
  filterCountryController,
  filterGetallCountries,
} = require("../Controller/filterCountryController");


const finterCountryHandler = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      

      const response = await filterCountryController(name);
      res.status(200).send(response);
    }
    const response = await filterGetallCountries();
    res.status(200).send(response);
  } catch (error) {
    error.message;
  }
};

module.exports = {
  finterCountryHandler,
};
