const express = require("express");
const config = require("./configs/config");
const bodyParser = require("body-parser");
const app = express();
const db = require("./models/index");

app.use(bodyParser.json());
db.sequelize.sync({ force: true, alter: true }).then(() => {
  console.log("tables dropped successfully");
});

require("./routes/category.route")(app);
require("./routes/product.route")(app);
require("./routes/auth.route")(app);
require("./routes/cart.route")(app);

app.listen(config.PORT, () => {
  console.log(`App running on PORT: ${config.PORT}`);
});
