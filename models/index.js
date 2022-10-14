const config = require("../configs/db.config");
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
db.category = require("../models/category.model")(sequelize);
db.product = require("../models/product.model")(sequelize);

db.category.hasMany(db.product);
db.product.belongsTo(db.category, {
  foreignKey: "categoryId",
});

module.exports = db;
