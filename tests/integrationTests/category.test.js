const app = require("../../app");
const request = require("supertest");
require("../../routes/category.route")(app);

describe("get all categories", () => {
  it("should return all the caregories success response", async () => {
    const response = await request(app).get("/ecomm/api/v1/category");
    expect(response.status).toBe(200);
  });
});
