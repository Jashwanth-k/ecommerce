const config = require("../configs/config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Sequelize.Op;
db.category = require("./category.model")(sequelize, Sequelize.DataTypes);
db.product = require("./product.model")(sequelize, Sequelize.DataTypes);
db.user = require("./user.model")(sequelize, Sequelize.DataTypes);
db.role = require("./role.model")(sequelize, Sequelize.DataTypes);
db.cart = require("./cart.model")(sequelize, Sequelize.DataTypes);
db.cartProduct = require("./cartProduct.model")(sequelize, Sequelize.DataTypes);

db.category.hasMany(db.product, {
  foreignKey: "categoryId",
});
db.product.belongsTo(db.category, {
  foreignKey: "categoryId",
});

db.role.belongsToMany(db.user, {
  through: "userRoles",
  foreignKey: "roleId",
  otherKey: "userId",
});

db.user.belongsToMany(db.role, {
  through: "userRoles",
  foreignKey: "userId",
  otherKey: "roleId",
});

db.cart.belongsToMany(db.product, { through: db.cartProduct });
db.product.belongsToMany(db.cart, { through: db.cartProduct });

db.user.hasOne(db.cart);
db.cart.belongsTo(db.user, {
  foreignKey: "userId",
});

module.exports = db;
