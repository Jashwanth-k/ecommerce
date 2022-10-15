const db = require("../models/index");

class ProductService {
  constructor() {
    this.schema = db.product;
  }

  createProduct(product) {
    return this.schema.create(product);
  }

  getProducts() {
    return this.schema.findAll({
      include: [
        {
          required: true,
          model: db.category,
        },
      ],
    });
  }

  getProductById(id) {
    return this.schema.findOne({
      where: {
        id: id,
      },
      include: [
        {
          required: true,
          model: db.category,
        },
      ],
    });
  }

  updateProductById(data, id) {
    return this.schema.update(data, {
      returning: true,
      where: {
        id: id,
      },
    });
  }

  deleteProductById(id) {
    return this.schema.destroy({
      where: {
        id: id,
      },
    });
  }
}

const productService = new ProductService();
module.exports = {
  productService,
};
