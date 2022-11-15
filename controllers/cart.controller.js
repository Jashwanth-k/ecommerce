const { cartService } = require("../services/cart.service");
const { productService } = require("../services/product.service");

function endResponse(response, statusCode, message) {
  response.writeHead(statusCode);
  response.end(JSON.stringify({ message: `${message}` }));
}

async function create(request, response) {
  const productId = parseInt(request.params.id);
  const cartId = request.decodedJwt.cartId;
  try {
    // check product is present with given id
    const product = await productService.getProductById(productId);
    if (!product) {
      endResponse(response, 404, "no product present with given id");
      return;
    }

    // add product to cartProducts table
    const userCart = await cartService.getCartById(cartId);
    // await cartService.updateCost(userId, product.cost);
    userCart.addProducts([product]);

    endResponse(response, 201, "product added successfully");
  } catch (err) {
    console.log(err, "🔥🔥🔥");
    endResponse(response, 500, "unable to add product to cart");
  }
}

async function getCart(request, response) {
  response.setHeader("content-type", "application/json");
  let returnValue, statusCode;
  try {
    const cartId = request.decodedJwt.cartId;
    // get cart of the user
    const userCart = await cartService.getCartById(cartId);
    // get all products from userCart
    const res = await userCart.getProducts();

    // res will have both cartId and productId columns
    returnValue = res.map((el) => {
      if (el.cartProducts.cartId === userCart.id) return el.dataValues;
    });
    if (returnValue.length === 0) {
      endResponse(response, 200, "cart is empty");
      return;
    }

    statusCode = 200;
    returnValue.push({ message: "products fetched successfully" });
  } catch (err) {
    statusCode = 500;
    console.log(err, "🔥🔥🔥");
    returnValue = { message: err };
  }
  response.writeHead(statusCode);
  response.end(JSON.stringify(returnValue));
}

async function removeProduct(request, response) {
  const productId = parseInt(request.params.id);
  const cartId = request.decodedJwt.cartId;
  try {
    const userCart = await cartService.getCartById(cartId);
    const res = await userCart.removeProducts([productId]);
    if (res === 0) {
      endResponse(response, 404, "no product found in cart with given id");
      return;
    }
    endResponse(response, 200, "product removed from cart");
  } catch (err) {
    console.log(err, "🔥🔥🔥");
    endResponse(response, 500, "internal server error");
  }
}

module.exports = {
  create,
  getCart,
  removeProduct,
};
