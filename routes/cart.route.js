const cartController = require("../controllers/cart.controller");
const authValidator = require("../validators/auth.validator");
const productValidator = require("../validators/product.validator");

module.exports = function (app) {
  // get products from cart
  app.get(
    "/ecomm/api/v1/cart",
    [authValidator.verifyJwtToken],
    cartController.getCart
  );
  // add product to cart
  app.post(
    "/ecomm/api/v1/cart/:id",
    [authValidator.verifyJwtToken, productValidator.validateRequestId],
    cartController.create
  );
  // get product with id
  app.delete(
    "/ecomm/api/v1/cart/:id",
    [authValidator.verifyJwtToken, productValidator.validateRequestId],
    cartController.removeProduct
  );
};