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
    await queryInterface.bulkInsert('Products', [
      {
        name: 'Baju Bayi',
        description: 'Baju bayi',
        sku: '12345',
        price: 10000,
        brand: 'Brand 1',
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mainan Bayi',
        description: 'Mainan bayi',
        sku: '67897',
        price: 10000,
        brand: 'Brand 2',
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Aksesoris Bayi',
        description: 'Aksesoris bayi',
        sku: '13579',
        price: 10000,
        brand: 'Brand 3',
        categoryId: 3,
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
    await queryInterface.bulkDelete('Products', null, {})
  }
};
