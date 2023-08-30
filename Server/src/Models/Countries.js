const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "country",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: false,
      },
    },
    { timestamps: false }
  );
};
