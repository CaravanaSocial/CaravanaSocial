const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('comment', {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        description:{
            type: DataTypes.TEXT,
            allowNull: false,
        },
        userName:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        imageUser:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    },{timestamps:true})
}