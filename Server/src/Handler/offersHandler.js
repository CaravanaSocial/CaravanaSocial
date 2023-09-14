const {
  postOfferController,
} = require("../Controller/Offer/postOfferController");
const {
  deleteOfferController,
} = require("../Controller/Offer/deleteOfferController");
const {
  getOfferController,
} = require("../Controller/Offer/getOfferController");
const {
  updateOfferController,
} = require("../Controller/Offer/updateOfferController");
const {
  getOfferByIdController,
} = require("../Controller/Offer/getOfferByIdController");

const postOfferHandler = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const response = await postOfferController({ data, id });
    if (response) {
      return res.status(200).json(response);
    } else return res.status(404).send("Offer already exist");
  } catch (error) {
    console.log({error: error.message});
    return res.status(500).json({ error: error.message });
  }
};

const deleteOfferHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await deleteOfferController(id);
    if (response) {
      return res.status(200).send("Delete Succesfully");
    } else return res.status(404).send("Offer not found");
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getOfferHandler = async (req, res) => {
  const { country, companyName, title, category } = req.query;
  try {
    const response = await getOfferController({
      title,
      country,
      companyName,
      category,
    });
    if (response) {
      return res.status(200).json(response);
    } else return res.status(404).send("Offer not found");
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateOfferHandler = async (req, res) => {
  try {
    const response = await updateOfferController(req.query);
    if (response) {
      return res.status(200).json(response);
    }
  } catch (error) {
    return res.status(500).send("No se encuentra");
  }
};

const getOfferByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const offer = await getOfferByIdController(id);
    return res.status(200).json(offer);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  postOfferHandler,
  deleteOfferHandler,
  getOfferHandler,
  updateOfferHandler,
  getOfferByIdHandler,
};
