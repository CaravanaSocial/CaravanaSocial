const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('user',{
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
        lastName:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        birthDate:{
            type: DataTypes.DATE,
            allowNull: false,
        },
        CUD:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        certificates:{
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: [],
            allowNull: true,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        freelancer: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        description:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull:true
        },
        activate:{
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        location: {
            type: DataTypes.JSON,
            allowNull:false
        },
        profilePicture: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        timestamps : false
    })
}