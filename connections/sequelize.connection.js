const { Sequelize } = require("sequelize");
const dbConfig = require("../configs/db.config");

const createConnection = function () {
  let sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    define: {
      timestamps: false,
    },
  });

  sequelize
    .authenticate()
    .then(() => console.log("connected successfully"))
    .catch((err) => console.log(`unable to connect to DB ${err}`));

  return { sequelize };
};

const { sequelize } = createConnection();

const executeWithSync = async function () {
  const syncPromise = await sequelize.sync();
  return syncPromise;
};

module.exports = { sequelize, executeWithSync };
