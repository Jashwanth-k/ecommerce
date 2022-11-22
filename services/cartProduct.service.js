const db = require("../models/index");
class CartProductService {
  constructor() {
    this.schema = db.cartProduct;
  }

  getCartProductById(cartId, productId) {
    return this.schema.findOne({
      where: {
        cartId: cartId,
        productId: productId,
      },
    });
  }

  changeQuantity(cartId, productId, inc) {
    return this.schema.increment("quantity", {
      by: inc ? 1 : -1,
      where: {
        cartId: cartId,
        productId: productId,
      },
    });
  }
}

const cartProductService = new CartProductService();
module.exports = { cartProductService };
