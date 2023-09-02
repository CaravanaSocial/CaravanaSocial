const { success } = require("../../db");

const getSuccessStories = async () => {
    try {
        const arraySuccess = success.findAll();
    
        return arraySuccess

    } catch (error) {
        throw error
    }
}

module.exports = {
    getSuccessStories
}