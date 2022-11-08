const { cartService } = require("../services/cart.service");
const { productService } = require("../services/product.service");

function endResponse(response, statusCode, message) {
  response.writeHead(statusCode);
  response.end(JSON.stringify({ message: `${message}` }));
}

async function create(request, response) {
  let statusCode, message;
  const item = {
    userId: request.decodedJwt.id,
    productId: parseInt(request.params.id),
  };
  try {
    // check product is present with given id
    const prodRes = await productService.getProductById(item.productId);
    if (!prodRes) {
      statusCode = 404;
      message = "no product present with given id";
      endResponse(response, statusCode, message);
      return;
    }

    await cartService.addProduct(item);
    statusCode = 201;
    message = "product added successfully";
    endResponse(response, statusCode, message);
  } catch (err) {
    statusCode = 500;
    message = "unable to add product to cart";
    endResponse(response, statusCode, message);
  }
}

async function getCart(request, response) {
  response.setHeader("content-type", "application/json");
  let returnValue, statusCode;
  try {
    const res = await cartService.getCartItems(request.decodedJwt.id);
    returnValue = res.map((el) => el.dataValues);
    if (returnValue.length === 0) {
      endResponse(response, 200, "cart is empty");
      return;
    }

    statusCode = 200;
    returnValue.push({ message: "products fetched successfully" });
  } catch (err) {
    // console.log(err);
    statusCode = 500;
    returnValue = { message: err };
  }
  response.writeHead(statusCode);
  response.end(JSON.stringify(returnValue));
}

async function removeProduct(request, response) {
  const productId = parseInt(request.params.id);
  const userId = request.decodedJwt.id;
  try {
    const res = await cartService.deleteProductById(userId, productId);
    if (res === 0) {
      endResponse(response, 404, "no product found in cart with given id");
      return;
    }
    endResponse(response, 200, "product removed from cart");
  } catch (err) {
    endResponse(response, 500, "internal server error");
  }
}

module.exports = {
  create,
  getCart,
  removeProduct,
};
