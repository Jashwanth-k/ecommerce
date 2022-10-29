const { signIn } = require("../controllers/auth.controller");
const { userService } = require("../services/user.service");

async function isEmailDuplicate(request, response, next) {
  let email = request.body.email;
  response.setHeader("content-type", "applications/json");
  try {
    const data = await userService.findUserByEmail(email);
    // here data will be null incase of new user email
    if (data) {
      response.writeHead(409);
      response.end(JSON.stringify({ message: "user email already exists" }));
      return;
    }
  } catch (err) {
    response.writeHead(500);
    response.end(JSON.stringify({ message: "internal server error" }));
    return;
  }
  next();
}

async function checkMandatoryFields(signIn, request, response, next) {
  response.setHeader("content-type", "applications/json");
  if (
    (signIn && (!request.body.email || !request.body.password)) ||
    (!signIn &&
      (!request.body.name ||
        !request.body.email ||
        !request.body.password ||
        !request.body.roles ||
        request.body.roles.length === 0))
  ) {
    response.writeHead(400);
    response.end(JSON.stringify({ message: "body is incorrect" }));
    return;
  }
  next();
}

async function validateEmail(request, response, next) {
  response.setHeader("content-type", "applications/json");
  const email = request.body.email;
  if (!email.includes("@") || !email.endsWith(".com")) {
    response.writeHead(400);
    response.end(JSON.stringify({ message: "invalid email format" }));
    return;
  }
  next();
}

module.exports = {
  isEmailDuplicate,
  checkMandatoryFields,
  validateEmail,
};
