const { DataTypes, Sequelize } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('training', {
        id:{
            type:DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        video:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    },{timestamps : false})
}