const db = require("./models/index");
const app = require("./app");

db.sequelize.sync({ alter: true }).then(() => {
  console.log("tables created successfully");
});

require("./routes/category.route")(app);
require("./routes/product.route")(app);
require("./routes/auth.route")(app);
require("./routes/cart.route")(app);

app.listen(process.env.PORT, () => {
  console.log(`App running on PORT: ${process.env.PORT}`);
});
