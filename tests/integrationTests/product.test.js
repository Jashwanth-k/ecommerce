const app = require("../../app");
const request = require("supertest");
require("../../routes/product.route")(app);

describe("get all the products", () => {
  it("should return all the products with success response", async () => {
    const response = await request(app).get("/ecomm/api/v1/product");
    expect(response.status).toBe(200);
  });
});
