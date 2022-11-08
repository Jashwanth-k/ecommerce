const authController = require("../controllers/auth.controller");
const authValidator = require("../validators/auth.validator");

module.exports = function (app) {
  // variable signIn is binded to callback function
  app.post(
    "/ecomm/api/v1/auth/signUp",
    [
      authValidator.checkMandatoryFields.bind(null, false),
      authValidator.validateEmail,
      authValidator.isEmailDuplicate,
    ],
    authController.signUp
  );

  app.post(
    "/ecomm/api/v1/auth/signIn",
    [
      authValidator.checkMandatoryFields.bind(null, true),
      authValidator.validateEmail,
    ],
    authController.signIn
  );
};
