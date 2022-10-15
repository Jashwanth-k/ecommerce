const productController = require("../controllers/product.controller");
const productValidator = require("../validators/product.validator");

module.exports = function (app) {
  // add products
  app.post(
    "/ecomm/app/v1/product",
    [productValidator.validateRequestCompleteBody],
    productController.create
  );
  // get all products
  app.get("/ecomm/app/v1/product", productController.findAll);
  // get only one product with given id
  app.get(
    "/ecomm/app/v1/product/:id",
    [productValidator.validateRequestId],
    productController.findOne
  );
  // to update a product
  app.put(
    "/ecomm/app/v1/product/:id",
    [productValidator.validateRequestBody, productValidator.validateRequestId],
    productController.update
  );
  // to delete a product
  app.delete(
    "/ecomm/app/v1/product/:id",
    [productValidator.validateRequestId],
    productController.deleteProduct
  );
};
