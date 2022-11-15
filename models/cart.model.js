const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  const cartSchema = sequelize.define("cart", {
    id: {
      type: DataTypes.SMALLINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    cost: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
    },
  });
  return cartSchema;
};
