const cartController = require("../controllers/cart.controller");
const authValidator = require("../validators/auth.validator");
const productValidator = require("../validators/product.validator");
const cartValidator = require("../validators/cart.validator");

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
    [
      productValidator.validateRequestId,
      authValidator.verifyJwtToken,
      cartValidator.validateProductById,
    ],
    cartController.addItems
  );
  // update quantity of product
  app.put(
    "/ecomm/api/v1/cart/:id",
    [
      productValidator.validateRequestId,
      authValidator.verifyJwtToken,
      cartValidator.validateProductById,
    ],
    cartController.modifyQuantity
  );
  // get product with id
  app.delete(
    "/ecomm/api/v1/cart/:id",
    [
      productValidator.validateRequestId,
      authValidator.verifyJwtToken,
      cartValidator.validateProductById,
    ],
    cartController.removeProduct
  );
};
