const express = require("express");
const serverConfig = require("./configs/server.config");
const { categoryRouter } = require("./controllers/category.controller");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

app.use("/ecomm/app/v1/category", categoryRouter);
require("./routes/product.route")(app);

app.listen(serverConfig.PORT, () => {
  console.log(`App running on PORT: ${serverConfig.PORT}`);
});
