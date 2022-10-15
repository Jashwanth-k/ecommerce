const categoryController = require("../controllers/category.controller");
const categoryValidator = require("../validators/category.validator");

module.exports = function (app) {
  // add categories
  app.post(
    "/ecomm/app/v1/category",
    [categoryValidator.validateRequestCompleteBody],
    categoryController.create
  );
  // get all categories
  app.get("/ecomm/app/v1/category", categoryController.findAll);
  // get only one category with given id
  app.get(
    "/ecomm/app/v1/category/:id",
    [categoryValidator.validateRequestId],
    categoryController.findOne
  );
  // to update a category
  app.put(
    "/ecomm/app/v1/category/:id",
    [
      categoryValidator.validateRequestBody,
      categoryValidator.validateRequestId,
    ],
    categoryController.update
  );
  // to delete a category
  app.delete(
    "/ecomm/app/v1/category/:id",
    [categoryValidator.validateRequestId],
    categoryController.deleteCategory
  );
};
