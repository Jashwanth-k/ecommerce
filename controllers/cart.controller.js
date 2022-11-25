const { cartService } = require("../services/cart.service");
const { cartProductService } = require("../services/cartProduct.service");

function endResponse(response, statusCode, resMsg) {
  response.writeHead(statusCode);
  response.end(JSON.stringify({ message: `${resMsg}` }));
}

async function addItems(request, response) {
  const product = request.product;
  const cartId = request.decodedJwt.cartId;
  try {
    const cart = await cartService.getCartById(cartId);
    // add product to cartProducts table
    const res = await cart.addProducts([product]);
    // change cost in cart if it was added
    res && (await cartService.changeCost(cartId, product.cost, true));

    endResponse(response, 201, "product added successfully");
  } catch (err) {
    endResponse(response, 500, "unable to add product to cart");
  }
}

async function removeProduct(request, response) {
  const product = request.product;
  const cartId = request.decodedJwt.cartId;
  try {
    const cart = await cartService.getCartById(cartId);
    const cartProduct = await cartProductService.getCartProductById(
      cartId,
      product.id
    );
    const res = await cart.removeProducts([product.id]);

    if (res === 0) {
      endResponse(response, 404, "no product found in cart with given id");
      return;
    }
    // updating cost in cart
    await cartService.changeCost(
      cartId,
      cartProduct.quantity * product.cost,
      false
    );
    endResponse(response, 200, "product removed from cart");
  } catch (err) {
    endResponse(response, 500, "internal server error");
  }
}

async function getCart(request, response) {
  response.setHeader("content-type", "application/json");
  let returnValue, statusCode;
  const cartId = request.decodedJwt.cartId;
  try {
    const cart = await cartService.getCartById(cartId);
    // get all products from cart
    const res = await cart.getProducts({ joinTableAttributes: ["quantity"] });
    returnValue = res.map((el) => {
      const product = el.dataValues;
      product.quantity = product.cartProducts.quantity;
      delete product.cartProducts;
      return product;
    });
    if (returnValue.length === 0) {
      endResponse(response, 200, "cart is empty");
      return;
    }

    statusCode = 200;
    returnValue.push({
      cost: `${cart.cost}`,
      message: "products fetched successfully",
    });
  } catch (err) {
    statusCode = 500;
    returnValue = { message: "unable to fetch cart" };
  }
  response.writeHead(statusCode);
  response.end(JSON.stringify(returnValue));
}

async function modifyQuantity(request, response) {
  const cartId = request.decodedJwt.cartId;
  const product = request.product;
  try {
    const state = JSON.parse(request.query.quantity);
    // result format [[undefined,no_of changed entires]]
    const [[, res]] = await cartProductService.changeQuantity(
      cartId,
      product.id,
      state
    );
    if (res === 0) {
      endResponse(response, 404, "no product found to update quantity");
      return;
    }
    // updating the cost
    await cartService.changeCost(cartId, product.cost, state);
    endResponse(response, 200, "quantity changed successfully");
  } catch (err) {
    endResponse(response, 500, "internal server error");
  }
}

module.exports = {
  addItems,
  getCart,
  removeProduct,
  modifyQuantity,
};
