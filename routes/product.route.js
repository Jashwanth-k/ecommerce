const productController = require("../controllers/product.controller");
const productValidator = require("../validators/product.validator");
const jwtValidator = require("../validators/auth.validator");

module.exports = function (app) {
  // add products
  app.post(
    "/ecomm/api/v1/product",
    [
      productValidator.validateRequestCompleteBody,
      jwtValidator.verifyJwtToken,
      jwtValidator.isAdmin,
    ],
    productController.create
  );
  // get all products
  app.get("/ecomm/api/v1/product", productController.findAll);
  // get only one product with given id
  app.get(
    "/ecomm/api/v1/product/:id",
    [productValidator.validateRequestId],
    productController.findOne
  );
  // to update a product
  app.put(
    "/ecomm/api/v1/product/:id",
    [
      productValidator.validateRequestBody,
      productValidator.validateRequestId,
      jwtValidator.verifyJwtToken,
      jwtValidator.isAdmin,
    ],
    productController.update
  );
  // to delete a product
  app.delete(
    "/ecomm/api/v1/product/:id",
    [
      productValidator.validateRequestId,
      jwtValidator.verifyJwtToken,
      jwtValidator.isAdmin,
    ],
    productController.deleteProduct
  );
};
