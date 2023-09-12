const { DataTypes, STRING } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('training', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        video: {
            type: DataTypes.ARRAY(DataTypes.STRING), 
            allowNull: true,
            defaultValue:[]
        },
        approved: {
            type: DataTypes.BOOLEAN,
            defaultValue: null,
            allowNull: true
        }
    }, { timestamps: false });
};
