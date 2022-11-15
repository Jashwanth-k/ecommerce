const db = require("../models/loadIndex");

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

  updateCost(userId, price) {
    return this.schema.increment("cost", {
      by: price,
      where: {
        userId: userId,
      },
    });
  }
}

const cartService = new CartService();
module.exports = { cartService };
