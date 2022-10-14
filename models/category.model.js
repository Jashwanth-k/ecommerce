const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  const categorySchema = sequelize.define(
    "category",
    {
      id: {
        type: DataTypes.SMALLINT,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "categories",
    }
  );

  return categorySchema;
};
