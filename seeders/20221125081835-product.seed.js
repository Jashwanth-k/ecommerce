"use strict";
const productsData = [
  {
    name: "lenovo legion",
    description: "this product is a laptop from lenovo with mid end features",
    cost: 50000,
    categoryId: 1,
  },
  {
    name: "Dell xps",
    description: "this product is a laptop from Dell with high end features",
    cost: 120000,
    categoryId: 1,
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("products", productsData);
  },

  async down(queryInterface, Sequelize) {
    return Promise.resolve();
  },
};
