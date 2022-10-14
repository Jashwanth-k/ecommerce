const { productService } = require("../services/product.service");

function create(request, response) {
  response.setHeader("content-type", "application/json");

  if (!request.body.name) {
    response.writeHead(400);
    response.end(JSON.stringify({ message: "body is incorrect" }));
  }

  let product = {
    name: request.body.name,
    cost: request.body.cost,
    categoryId: request.body.categoryId,
  };

  productService
    .createProduct(product)
    .then((data) => {
      let returnValue = data.dataValues;
      returnValue.message = "product created successfully";
      response.writeHead(200);
      response.end(JSON.stringify(returnValue));
    })
    .catch((err) => {
      response.writeHead(500);
      response.end(JSON.stringify({ message: "error occured" }));
    });
}

function findAll(request, response) {
  response.setHeader("content-type", "application/json");
  productService
    .getProducts()
    .then((products) => {
      let returnValue = products;
      (returnValue.message = "products fetched successfully"),
        response.writeHead(200);
      response.end(JSON.stringify(returnValue));
    })
    .catch((err) => {
      response.writeHead(500);
      console.log(err);
      response.end(JSON.stringify({ message: "error occured" }));
    });
}

function findOne(request, response) {
  response.setHeader("content-type", "application/json");
  let productId = request.params.id;
  if (!productId) {
    response.writeHead(400);
    response.end(JSON.stringify({ message: "product id is NaN" }));
  }

  productService
    .getProductById(parseInt(productId))
    .then((data) => {
      let returnValue = data.dataValues;
      if (!returnValue) throw new Error("No product found with given id");
      returnValue.message = "product fetched successfully";
      response.writeHead(200);
      response.end(JSON.stringify(returnValue));
    })
    .catch((err) => {
      response.writeHead(500);
      console.log(err);
      response.end(JSON.stringify({ message: `error occured ${err}` }));
    });
}

function update(request, response) {
  let productId = request.params.id;
  let product = {
    name: request.body.name,
    cost: request.body.cost,
    categoryId: request.body.categoryId,
  };

  response.setHeader("content-type", "application/json");
  productService
    .updateProductById(product, productId)
    .then((data) => {
      let returnValue = data;
      returnValue.message = "product updated successfully";
      response.writeHead(200);
      response.end(JSON.stringify(returnValue));
    })
    .catch((err) => {
      response.writeHead(500);
      response.end(JSON.stringify({ message: "error occured" }));
    });
}

function deleteProduct(request, response) {
  let productId = request.params.id;

  response.setHeader("content-type", "application/json");
  productService
    .deleteProductById(productId)
    .then((product) => {
      let returnValue = product;
      returnValue.message = "product deleted successfully";
      response.writeHead(200);
      response.end(JSON.stringify(returnValue));
    })
    .catch((err) => {
      response.writeHead(500);
      response.end(JSON.stringify({ message: "error occured" }));
    });
}

module.exports = {
  create,
  findAll,
  findOne,
  update,
  deleteProduct,
};
