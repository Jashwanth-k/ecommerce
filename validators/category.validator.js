function validateRequestCompleteBody(request, response, next) {
  if (!request.body.name || !request.body.description) {
    response.writeHead(400);
    response.end(JSON.stringify({ message: "body is incorrect" }));
  }
  next();
}

function validateRequestBody(request, response, next) {
  if (!request.body.name && !request.body.description) {
    response.writeHead(400);
    response.end(JSON.stringify({ message: "body cannot be empty" }));
  }
  next();
}

function validateRequestId(request, response, next) {
  const id = request.params.id;
  if (isNaN(id)) {
    response.writeHead(400);
    response.end(JSON.stringify({ message: "product id is NaN" }));
  }
  next();
}

module.exports = {
  validateRequestCompleteBody,
  validateRequestBody,
  validateRequestId,
};
