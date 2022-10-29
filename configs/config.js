require("dotenv").config();

module.exports = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 2,
    acquire: 30000, // maxtime in ms the pool will wait to get connnection before throwing error
    idle: 10000, // maxtime the connection will be idle before being released
  },
  PORT: process.env.PORT,
  SECRET: process.env.JWT_SECRET,
  EXPIRES_IN: process.env.JWT_EXPIRES_IN,
};
