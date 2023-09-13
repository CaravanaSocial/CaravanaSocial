const { DataTypes } = require ('sequelize');

module.exports = (sequelize) => {
    sequelize.define('success', {
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
        image:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        testimony:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        facebook:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        linkedin:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        instagram:{
            type: DataTypes.TEXT,
            allowNull : true
        },
        twitter:{
            type: DataTypes.TEXT,
            allowNull:true
        }
    })
}