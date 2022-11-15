const { jwtService } = require("../services/jwt.service");
const { userService } = require("../services/user.service");
const lodash = require("lodash");

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

function checkMandatoryFields(signIn, request, response, next) {
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

function validateEmail(request, response, next) {
  response.setHeader("content-type", "applications/json");
  const email = request.body.email;
  if (!email.includes("@") || !email.endsWith(".com")) {
    response.writeHead(400);
    response.end(JSON.stringify({ message: "invalid email format" }));
    return;
  }
  next();
}

async function verifyJwtToken(request, response, next) {
  try {
    const token = request.headers["token"];
    if (!token || !token.includes("Bearer")) throw new Error("token is absent");

    // decoded token
    const decodedJwt = jwtService.validateToken(token.slice(7));
    request.decodedJwt = decodedJwt;
    next();
  } catch (err) {
    response.setHeader("content-type", "application/json");
    response.writeHead(498);
    response.end(JSON.stringify({ message: `${err}` }));
  }
}

function isAdmin(request, response, next) {
  const userRoles = request.decodedJwt.roles;
  if (!userRoles.includes("admin")) {
    response.writeHead(403);
    response.end(JSON.stringify({ message: "user can't access resources" }));
    return;
  }
  next();
}

module.exports = {
  isEmailDuplicate,
  checkMandatoryFields,
  validateEmail,
  verifyJwtToken,
  isAdmin,
};

/*
verify token data with data present in database
 const userRes = await userService.findUserByEmail(decodedJwt.email);
    if (!userRes) throw new Error("token expired");

    const rolesRes = [...(await userRes.getRoles())].map(
      (el) => el.dataValues.name
    );
    const user = { id: userRes.id, email: userRes.email, roles: rolesRes };
    // compare two objects in depth
    if (!lodash.isEqual(user, decodedJwt)) throw new Error("token expired");
*/
