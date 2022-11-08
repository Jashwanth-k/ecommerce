function validateRequestCompleteBody(request, response, next) {
  response.setHeader("content-type", "application/json");
  if (
    !request.body.name ||
    !request.body.description ||
    !request.body.cost ||
    !request.body.categoryId
  ) {
    response.writeHead(400);
    response.end(JSON.stringify({ message: "body is incorrect" }));
    return;
  }
  next();
}

function validateRequestBody(request, response, next) {
  response.setHeader("content-type", "application/json");
  if (
    !request.body.name &&
    !request.body.description &&
    !request.body.cost &&
    !request.body.categoryId
  ) {
    response.writeHead(400);
    response.end(JSON.stringify({ message: "body cannot be empty" }));
    return;
  }
  next();
}

function validateRequestId(request, response, next) {
  response.setHeader("content-type", "application/json");
  const id = request.params.id;
  if (isNaN(id)) {
    response.writeHead(400);
    response.end(JSON.stringify({ message: "product id is NaN" }));
    return;
  }
  next();
}

module.exports = {
  validateRequestCompleteBody,
  validateRequestBody,
  validateRequestId,
};
