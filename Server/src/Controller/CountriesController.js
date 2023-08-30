const countries = require("../Tools/countries.json");
const cities = require("../Tools/cities.json");
const states = require("../Tools/states.json");
const { country } = require("../db");

const createCountries = async (req, res) => {
  try {
    const response = await country.bulkCreate(countries.countries);

    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send("Error occurred");
  }
};

module.exports = {
  createCountries,
};
