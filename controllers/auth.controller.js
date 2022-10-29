const { authService } = require("../services/auth.service");

async function signUp(request, response) {
  const roleNames = [...new Set(request.body.roles)];
  delete request.body.roles;
  try {
    await authService.signUp(request.body, roleNames);
  } catch (err) {
    response.writeHead(501);
    response.end(JSON.stringify({ message: `${err}` }));
    return;
  }
  response.writeHead(201);
  response.end(JSON.stringify({ message: "user signUp successful" }));
}

async function signIn(request, response) {
  try {
    const signInRes = await authService.signIn(request.body);
    response.writeHead(200);
    response.end(JSON.stringify(signInRes));
  } catch (err) {
    response.writeHead(401);
    response.end(JSON.stringify({ message: `${err}` }));
  }
}

module.exports = {
  signUp,
  signIn,
};
