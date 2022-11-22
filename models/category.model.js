module.exports = function (sequelize, DataTypes) {
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
    { tableName: "categories" }
  );

  return categorySchema;
};
