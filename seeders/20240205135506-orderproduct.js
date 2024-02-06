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
    await queryInterface.bulkInsert('OrderProducts', [
      {
        orderId: 1,
        productId: 1,
        price: 10000,
        quantity: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        orderId: 2,
        productId: 2,
        price: 20000,
        quantity: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        orderId: 3,
        productId: 3,
        price: 30000,
        quantity: 15,
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
    await queryInterface.bulkDelete('OrderProducts', null, {})
  }
};
