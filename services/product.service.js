const db = require("../models/index");

class ProductService {
  constructor() {
    this.schema = db.product;
  }

  createProduct(product) {
    return this.schema.create(product);
  }

  getProducts(filters) {
    filters = this.#buildFilters(filters);
    return this.schema.findAll({
      where: filters.product,
      include: [
        {
          required: true,
          model: db.category,
          where: filters.category,
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

  #buildFilters(filters) {
    const product = {};
    const category = {};
    product["cost"] = {
      [db.Op.lte]: Number(filters["product.maxCost"]) || Number.MAX_VALUE,
      [db.Op.gte]: Number(filters["product.minCost"]) || Number.MIN_VALUE,
    };
    if (filters["product.categoryId"])
      product["categoryId"] = Number(filters["product.categoryId"]);
    if (filters["category.name"]) {
      category["name"] = filters["category.name"];
    }

    return { product, category };
  }
}

const productService = new ProductService();
module.exports = {
  productService,
};
