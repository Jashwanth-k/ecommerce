module.exports = function (sequelize, DataTypes) {
  return sequelize.define("cartProducts", {
    id: {
      type: DataTypes.SMALLINT,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.SMALLINT,
      defaultValue: 1,
    },
  });
};
