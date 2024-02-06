'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Warehouses', [
      {
        location: 'Jakarta',
        capacity: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        location: 'Surabaya',
        capacity: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        location: 'Medan',
        capacity: 300,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Warehouses', null, {})
  }
};
