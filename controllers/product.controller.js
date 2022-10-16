const { productService } = require("../services/product.service");

function create(request, response) {
  response.setHeader("content-type", "application/json");
  const product = request.body;

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
    .getProducts(request.query)
    .then((products) => {
      let returnValue = products;
      returnValue.push({ message: "products fetched successfully" });
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

  productService
    .getProductById(parseInt(productId))
    .then((data) => {
      if (!data) throw new Error("No product found with given id");
      let returnValue = data.dataValues;
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
  let product = request.body;

  response.setHeader("content-type", "application/json");
  productService
    .updateProductById(product, productId)
    .then((data) => {
      if (data[1] !== 1) throw new Error("unable to update product");
      findOne(request, response);
    })
    .catch((err) => {
      response.writeHead(500);
      response.end(JSON.stringify({ message: `${err}` }));
    });
}

function deleteProduct(request, response) {
  let productId = request.params.id;

  response.setHeader("content-type", "application/json");
  productService
    .deleteProductById(productId)
    .then((data) => {
      if (data === 0) throw new Error("No product found with given id");
      response.writeHead(200);
      response.end(JSON.stringify({ message: "product deleted successfully" }));
    })
    .catch((err) => {
      response.writeHead(500);
      response.end(JSON.stringify({ message: `${err}` }));
    });
}

module.exports = {
  create,
  findAll,
  findOne,
  update,
  deleteProduct,
};
