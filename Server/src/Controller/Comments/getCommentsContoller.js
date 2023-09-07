const { comment, training } = require("../../db")



const getCommentsController = async () => {

    try {
        const allCommentsDb = await comment.findAll({
            include:[
                {
                model: training

                }
            ]
        });

        return allCommentsDb;

    } catch (error) {
        throw error
    }


}

module.exports = {
    getCommentsController
}