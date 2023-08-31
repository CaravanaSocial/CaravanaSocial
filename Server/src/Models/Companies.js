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
        }

    },{
        timestamps : false
    })
}