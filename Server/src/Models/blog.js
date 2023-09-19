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
            allowNull: false
        },
        date:{
            type: DataTypes.STRING,
            allowNull: false
        }
    });
};
