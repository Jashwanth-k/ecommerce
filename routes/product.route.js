const productController = require("../controllers/product.controller");

module.exports = function (app) {
  // add products
  app.post("/ecomm/app/v1/product", productController.create);
  // get all products
  app.get("/ecomm/app/v1/product", productController.findAll);
  // get only one product with given id
  app.get("/ecomm/app/v1/product/:id", productController.findOne);
  // to update a product
  app.put("/ecomm/app/v1/product/:id", productController.update);
  // to delete a product
  app.delete("/ecomm/app/v1/product/:id", productController.deleteProduct);
};
