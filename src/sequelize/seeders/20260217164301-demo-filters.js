"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Filters", [
      {
        weight_amount: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        weight_amount: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        weight_amount: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        weight_amount: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        weight_amount: 25,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        weight_amount: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        weight_amount: 35,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Filters", null, {});
  },
};
