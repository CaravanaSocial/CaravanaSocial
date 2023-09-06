const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('question', {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        question:{
            type: DataTypes.TEXT,
            allowNull: false,
        },
        answer:{
            type: DataTypes.TEXT,
            allowNull:false
        }
    })
}