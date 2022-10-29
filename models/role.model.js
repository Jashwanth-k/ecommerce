const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  const roleSchema = sequelize.define(
    "role",
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
    },
    {
      tableName: "roles",
    }
  );
  return roleSchema;
};
