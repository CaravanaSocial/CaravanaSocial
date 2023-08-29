const { DataTypes, Sequelize } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) =>{
    sequelize.define('country', {
        id:{
            type:DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        nameCountry:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
}