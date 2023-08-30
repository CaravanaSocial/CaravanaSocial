const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "state",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      id_country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
