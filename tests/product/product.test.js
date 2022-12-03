const db = require("../../models/index");
const productController = require("../../controllers/product.controller");
const { mockRequest, mockResponse } = require("../interceptor");
const { productService } = require("../../services/product.service");

describe("test for creating a product", () => {
  let req, res;
  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });
  const testPayload = {
    name: "motorola",
    description: "mid range mobile phone",
    cost: 25000,
    categoryId: 1,
  };
  const testErrorPayload = { message: "error occured" };

  async function testCallback(success) {
    // below mock function should return the obj with data when called by controller
    const spy = jest
      .spyOn(productService, "createProduct")
      .mockImplementation((payload) =>
        success
          ? Promise.resolve({ dataValues: payload })
          : Promise.reject(payload)
      );

    req.body = testPayload;
    await productController.create(req, res);
    expect(spy).toHaveBeenCalled();
    expect(res.status).toEqual(success ? 201 : 500);
    expect(res.body).toEqual(success ? testPayload : testErrorPayload);
  }

  test("success: should return product details", testCallback.bind(null, true));
  test("fail: should return error message", testCallback.bind(null, false));
});
