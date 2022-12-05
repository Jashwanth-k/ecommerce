"use strict";

const db = require("../models");
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
    // to clear all the tables data and create tables
    await db.sequelize.sync({ force: true });
    return Promise.resolve();
  },
};
