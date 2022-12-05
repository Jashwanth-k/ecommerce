"use strict";
const rolesData = [{ name: "admin" }, { name: "user" }];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("roles", rolesData);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("roles", null);
  },
};
