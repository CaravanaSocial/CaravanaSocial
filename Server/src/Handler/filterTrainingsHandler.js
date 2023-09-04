const { filterTrain } = require("../Controller/filterTrainings/filterTrain");

const filterTrainings = async (req, res) => {
  try {
    const leakedTrainings = await filterTrain(req.query);

    return res.status(200).json(leakedTrainings);
  } catch (error) {
    return res.status(400).send("No se ha encontrado capacitaciones ");
  }
};

module.exports = {
  filterTrainings,
};
