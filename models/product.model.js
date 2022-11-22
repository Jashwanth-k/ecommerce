module.exports = function (sequelize, DataTypes) {
  const productSchema = sequelize.define(
    "products",
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
      cost: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
      },
      categoryId: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
    },
    {
      tableName: "products",
    }
  );
  return productSchema;
};
