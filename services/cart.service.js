const db = require("../models/index");

class CartService {
  constructor() {
    this.schema = db.cart;
  }

  createCart(userId) {
    return this.schema.create(userId);
  }

  getCartByUserId(userId) {
    return this.schema.findOne({
      where: {
        userId: userId,
      },
    });
  }

  getCartById(id) {
    return this.schema.findByPk(id);
  }

  changeCost(id, price, inc) {
    return this.schema.increment("cost", {
      by: inc ? price : -price,
      where: {
        id: id,
      },
    });
  }
}

const cartService = new CartService();
module.exports = { cartService };
