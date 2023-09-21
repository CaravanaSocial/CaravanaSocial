const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('blog', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        image: {
            type: DataTypes.TEXT, 
            allowNull: false,
        },
        template: {
            type: DataTypes.TEXT,
            defaultValue: null,
            allowNull: true
        },
        date:{
            type: DataTypes.STRING,
            allowNull: false
        },
        type:{
            type: DataTypes.STRING,
            allowNull: false
        },
        urlData:{
            type: DataTypes.STRING,
            allowNull: true
        }
    },{timestamps: false});
};
