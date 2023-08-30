const { DataTypes } = require('sequelize')

module.exports = (sequelize) =>{
    sequelize.define('admin',{
        id:{
            type:DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name:{
            type: DataTypes.STRING,
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
        createdKey:{
            type : DataTypes.STRING,
            allowNull:true,
        }
    })
}