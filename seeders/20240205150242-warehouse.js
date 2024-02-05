"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Warehouses",
      [
        {
          admin_id: 1,
          name: "Gudang 1",
          city: "Jogja",
          address: "Jl tentara no 5",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          admin_id: 1,
          name: "Gudang 2",
          city: "Jogja",
          address: "Jl tentara no 2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          admin_id: 1,
          city: "mamarika",
          name: "Gudang 3",
          address: "jl tentara 3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          admin_id: 1,
          city: "Butgerking",
          name: "Gudang 4",
          address: "696 buffet",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          admin_id: 1,
          city: "mason",
          name: "Gudang 5",
          address: "6666 luxury penthouse",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Warehouses", null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  },
};
