const express = require("express");
const config = require("./configs/config");
const bodyParser = require("body-parser");
const app = express();
const db = require("./models/index");

app.use(bodyParser.json());
db.sequelize
  .sync({
    force: true,
  })
  .then(() => {
    console.log("tables dropped successfully");
    init();
  });

async function init() {
  const categories = [
    {
      name: "Electronics",
      description: "this category consists of electronic items",
    },
    {
      name: "HomeAppliances",
      description: "this category consists of home appliances",
    },
  ];

  const products = [
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

  const roles = [{ name: "admin" }, { name: "user" }];

  try {
    db.category.bulkCreate(categories);
    db.product.bulkCreate(products);
    db.role.bulkCreate(roles);
    console.log("tables created successfully");
  } catch (err) {
    console.log("error while creating tables");
  }
}

require("./routes/category.route")(app);
require("./routes/product.route")(app);
require("./routes/auth.route")(app);

app.listen(config.PORT, () => {
  console.log(`App running on PORT: ${config.PORT}`);
});
