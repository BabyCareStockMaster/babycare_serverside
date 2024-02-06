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
    await queryInterface.bulkInsert('ProductWarehouses', [
      {
        productId: 1,
        warehouseId: 1,
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 2,
        warehouseId: 2,
        stock: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 3,
        warehouseId: 3,
        stock: 20,
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
    await queryInterface.bulkDelete('ProductWarehouses', null, {})
  }
};
