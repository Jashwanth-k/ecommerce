const db = require("../models/index");

class CartService {
  constructor() {
    this.schema = db.cart;
  }

  addProduct(product) {
    return this.schema.create(product);
  }

  getProductById(userId, productId) {
    return this.schema.findOne({
      where: {
        userId: userId,
        productId: productId,
      },
    });
  }

  deleteProductById(userId, productId) {
    return this.schema.destroy({
      where: {
        productId: productId,
        userId: userId,
      },
    });
  }

  getCartItems(id) {
    // loads the orders with given userId
    return this.schema.findAll({
      where: {
        userId: id,
      },
      include: [
        {
          // to load the orders with products
          required: true,
          model: db.product,
        },
        // to load the user
        // {
        //   required: true,
        //   model: db.user,
        // },
      ],
    });
  }
}

const cartService = new CartService();
module.exports = { cartService };
