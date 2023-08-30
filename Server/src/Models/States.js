const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "states",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
