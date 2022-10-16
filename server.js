const express = require("express");
const serverConfig = require("./configs/server.config");
const bodyParser = require("body-parser");
const app = express();
const db = require("./models/index");

app.use(bodyParser.json());
db.sequelize
  .sync({
    force: true,
  })
  .then(() => {
    init();
    console.log("tables dropped and created");
  });

function init() {
  let categories = [
    {
      name: "Electronics",
      description: "this category consists of electronic items",
    },
    {
      name: "HomeAppliances",
      description: "this category consists of home appliances",
    },
  ];
  db.category
    .bulkCreate(categories)
    .then(() => console.log("categories table is initiated"))
    .catch(() => console.log("error while initializing categories table"));

  let products = [
    {
      name: "lenovo legion",
      description: "this product is a laptop from lenovo with mid end features",
      cost: 50000,
      categoryId: 1,
    },
    {
      name: "Dell xps",
      description: "this product is a laptop from Dell with high end features",
      cost: 120000,
      categoryId: 1,
    },
  ];

  db.product
    .bulkCreate(products)
    .then(() => console.log("products table is initiated"))
    .catch(() => console.log("error while initializing products table"));
}

require("./routes/category.route")(app);
require("./routes/product.route")(app);

app.listen(serverConfig.PORT, () => {
  console.log(`App running on PORT: ${serverConfig.PORT}`);
});
