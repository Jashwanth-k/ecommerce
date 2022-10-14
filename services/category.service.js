const { categorySchema } = require("../models/category.model");
class CategoryService {
  constructor() {
    this.schema = categorySchema;
  }

  createCategory(category) {
    return this.schema.create(category);
  }

  getCategories() {
    return this.schema.findAll();
  }

  getCategoryById(id) {
    return this.schema.findOne({
      where: {
        id: id,
      },
    });
  }

  deleteCategory(id) {
    return this.schema.destroy({
      where: {
        id: id,
      },
    });
  }
}

const categoryService = new CategoryService();
module.exports = { categoryService };
