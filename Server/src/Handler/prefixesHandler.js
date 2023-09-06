const { getPrefixesController } = require("../Controller/prefixesController");

const getPrefixesHandler = async (req, res) => {
  try {
    const prefixes = await getPrefixesController();
    res.status(200).json(prefixes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getPrefixesHandler,
};
