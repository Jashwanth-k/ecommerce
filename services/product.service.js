const { categorySchema } = require("../models/category.model");
const { productSchema } = require("../models/product.model");

class ProductService {
  constructor() {
    this.schema = productSchema;
  }

  createProduct(product) {
    return this.schema.create(product);
  }

  getProducts() {
    return this.schema.findAll({
      include: [
        {
          required: true,
          model: categorySchema,
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
          model: categorySchema,
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
