const { productService } = require("../services/product.service");

async function validateProductById(request, response, next) {
  const productId = parseInt(request.params.id);
  try {
    const product = await productService.getProductById(productId);
    if (!product) throw "no product found with given id";
    request.product = product;
    next();
  } catch (err) {
    response.writeHead(404);
    response.end(JSON.stringify({ message: `${err}` }));
  }
}

module.exports = { validateProductById };
