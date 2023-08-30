const cities = require("../Tools/cities.json");
const { city } = require("../db");

const CreateCities = async (req, res) => {
  console.log(cities.cities);
  const response = await city.bulkCreate(cities.cities);
  try {
    console.log(response);
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send("Error occurred");
  }
};

module.exports = {
  CreateCities,
};
