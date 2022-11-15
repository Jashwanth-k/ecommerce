const db = require("../models/index");

class CategoryService {
  constructor() {
    this.schema = db.category;
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

  updateCategory(id, data) {
    return this.schema.update(data, {
      returning: true,
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
