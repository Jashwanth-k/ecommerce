"use strict";
const rolesData = [
  { id: 1, name: "admin" },
  { id: 2, name: "user" },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("roles", rolesData);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("roles", null);
  },
};
