const { training, companies } = require('../../db');

const getAll = async () => {
    try {
        const findAll = await training.findAll({
            include: companies
        })

        return findAll
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAll
}