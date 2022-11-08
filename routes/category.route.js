const categoryController = require("../controllers/category.controller");
const categoryValidator = require("../validators/category.validator");
const jwtValidator = require("../validators/auth.validator");

module.exports = function (app) {
  // add categories
  app.post(
    "/ecomm/api/v1/category",
    [
      categoryValidator.validateRequestCompleteBody,
      jwtValidator.verifyJwtToken,
      jwtValidator.isAdmin,
    ],
    categoryController.create
  );
  // get all categories
  app.get("/ecomm/api/v1/category", categoryController.findAll);
  // get only one category with given id
  app.get(
    "/ecomm/api/v1/category/:id",
    [categoryValidator.validateRequestId],
    categoryController.findOne
  );
  // to update a category
  app.put(
    "/ecomm/api/v1/category/:id",
    [
      categoryValidator.validateRequestBody,
      categoryValidator.validateRequestId,
      jwtValidator.verifyJwtToken,
      jwtValidator.isAdmin,
    ],
    categoryController.update
  );
  // to delete a category
  app.delete(
    "/ecomm/api/v1/category/:id",
    [
      categoryValidator.validateRequestId,
      jwtValidator.verifyJwtToken,
      jwtValidator.isAdmin,
    ],
    categoryController.deleteCategory
  );
};
