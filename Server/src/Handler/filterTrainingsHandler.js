const { filterTrain } = require('../Controller/filterTrainings/filterTrain')

const filterTrainings = async (req, res) => {
    const leakedTrainings = await filterTrain(req.query);
}

module.exports = { 
    filterTrainings 
}