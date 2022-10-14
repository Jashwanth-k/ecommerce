const { request, response } = require("express");
const express = require("express");
const categoryRouter = express.Router();
const { executeWithSync } = require("../connections/sequelize.connection");
const { categoryService } = require("../services/category.service");

categoryRouter.get("/:id", (request, response) => {
  executeWithSync(
    categoryService
      .deleteCategory(parseInt(request.params.id))
      .then((data) => {
        response.writeHead(200);
        response.end(JSON.stringify({ message: "row deleted" }));
      })
      .catch((err) => {
        response.writeHead(500);
        response.end(JSON.stringify({ message: "error occured!" }));
      })
  );
});

categoryRouter.get("/", (request, response) => {
  response.setHeader("content-type", "application/json");
  executeWithSync(
    categoryService
      .getCategories()
      .then((data) => {
        response.writeHead(200);
        response.end(JSON.stringify(data));
      })
      .catch((err) => {
        response.writeHead(500);
        response.end(JSON.stringify({ message: "error occured" }));
      })
  );
});

categoryRouter.post("/", (request, response) => {
  response.setHeader("content-type", "application/json");
  executeWithSync(
    categoryService
      .createCategory(request.body)
      .then((data) => {
        response.writeHead(200);
        response.end(JSON.stringify(data.dataValues));
      })
      .catch((err) => {
        response.writeHead(500);
        response.end(JSON.stringify({ message: "error occured" }));
      })
  );
});

module.exports = { categoryRouter };
