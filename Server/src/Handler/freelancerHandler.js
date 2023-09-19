const {
  getFreelancerController,
} = require("../Controller/Freelancers/getFreelancerController");

const getFreelancerHandler = async (req, res) => {
  try {
    const response = await getFreelancerController(req.query);

      res.status(200).json(response);
    
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  getFreelancerHandler,
};
