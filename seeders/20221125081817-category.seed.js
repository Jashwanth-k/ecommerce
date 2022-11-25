"use strict";
const categoriesData = [
  {
    name: "Electronics",
    description: "this category consists of electronic items",
  },
  {
    name: "HomeAppliances",
    description: "this category consists of home appliances",
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("categories", categoriesData);
  },

  async down(queryInterface, Sequelize) {
    return Promise.resolve();
  },
};
