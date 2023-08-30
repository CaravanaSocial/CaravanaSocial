const countries = require("../Tools/countries.json");
const { country } = require("../db");

const createCountries = async (req, res) => {
  try {
    const response = await country.bulkCreate(countries.countries);

    return res.status(200).send(response);
  } catch (error) {}
};

module.exports = {
  createCountries,
};
