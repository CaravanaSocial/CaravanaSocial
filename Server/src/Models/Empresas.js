const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid')

module.exports = (sequelize) => {
    sequelize.define('Companies', {
        id:{
            type: DataTypes.UUID, 
            defaultValue: DataTypes.UUIDV4, 
            primaryKey: true,
            allowNull: false,
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            unique:true
        },
        position:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        nameCompanie:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        areaTraining:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique:true
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
            unique:true
        },
        phone:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        trainings:{
            type: DataTypes.STRING,
            allowNull: false
        },
        country:{
            type: DataTypes.STRING,
            allowNull: false
        }

    },{
        timestamps : false
    })
}