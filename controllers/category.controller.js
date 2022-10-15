const { categoryService } = require("../services/category.service");

function create(request, response) {
  response.setHeader("content-type", "application/json");
  categoryService
    .createCategory(request.body)
    .then((data) => {
      let returnValue = data;
      returnValue.message = "category created successfully";
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
  categoryService
    .getCategories()
    .then((data) => {
      let returnValue = data;
      returnValue.message = "categories fetched successfully";
      response.writeHead(200);
      response.end(JSON.stringify(returnValue));
    })
    .catch((err) => {
      response.writeHead(500);
      response.end(JSON.stringify({ message: "error occured" }));
    });
}

function findOne(request, response) {
  const categoryId = parseInt(request.params.id);

  response.setHeader("content-type", "application/json");
  categoryService
    .getCategoryById(categoryId)
    .then((data) => {
      let returnValue = data.dataValues;
      returnValue.message = "cateogry fetched successfully";
      response.writeHead(200);
      response.end(JSON.stringify(returnValue));
    })
    .catch((err) => {
      response.writeHead(500);
      response.end(
        JSON.stringify({ message: "No category found with given id" })
      );
    });
}

function update(request, response) {
  response.setHeader("content-type", "application/json");
  categoryService
    .updateCategory(parseInt(request.params.id), request.body)
    .then((data) => {
      if (data[1] !== 1) throw new Error("unable to update category");
      findOne(request, response);
    })
    .catch((err) => {
      response.writeHead(500);
      response.end(JSON.stringify({ message: `${err}` }));
    });
}

function deleteCategory(request, response) {
  const categoryId = parseInt(request.params.id);
  response.setHeader("content-type", "application/json");

  categoryService
    .deleteCategory(categoryId)
    .then((data) => {
      if (data === 0) throw new Error("No category found with given id");
      response.writeHead(200);
      response.end(JSON.stringify({ message: "row deleted" }));
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
  deleteCategory,
};
