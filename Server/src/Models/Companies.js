const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('companies', {
        id:{
            type: DataTypes.UUID, 
            defaultValue: DataTypes.UUIDV4, 
            primaryKey: true,
            allowNull: false,
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull:false
        },
        position:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        nameCompany:{
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
        },
        phone:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        activate:{
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }

    },{
        timestamps : false
    })
}