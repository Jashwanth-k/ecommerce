module.exports = function (sequelize, DataTypes) {
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
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.fn("now"),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.fn("now"),
      },
    },
    {
      tableName: "roles",
    }
  );
  return roleSchema;
};
