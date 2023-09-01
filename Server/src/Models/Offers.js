const { DataTypes } = require('sequelize');


module.exports = (sequelize) =>{
    sequelize.define('offer', {
        id:{
            type:DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        description:{
            type: DataTypes.TEXT,
            allowNull: false
        }
    },{timestamps : false})
}