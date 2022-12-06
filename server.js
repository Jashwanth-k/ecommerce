const db = require("./models/index");
const app = require("./app");
const apiEndPoints = require("./ecommerce.postman_collection.json");

db.sequelize.sync({ alter: true }).then(() => {
  console.log("tables created successfully");
});

require("./routes/category.route")(app);
require("./routes/product.route")(app);
require("./routes/auth.route")(app);
require("./routes/cart.route")(app);

app.get("/", (req, res) => {
  apiEndPoints["message"] = "postman api collection";
  res.setHeader("content-type", "application/json");
  res.writeHead(200);
  res.end(JSON.stringify(apiEndPoints));
});

app.listen(process.env.PORT, () => {
  console.log(`App running on PORT: ${process.env.PORT}`);
});
