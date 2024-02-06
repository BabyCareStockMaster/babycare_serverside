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
    await queryInterface.bulkInsert('Orders', [
      {
        userId: 1,
        warehouseId: 1,
        status: 'pending',
        trackingCode: '123',
        totalPrice: 10000,
        address: 'Jl. Raya',
        totalItem: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        warehouseId: 2,
        status: 'pending',
        trackingCode: '342',
        totalPrice: 15000,
        address: 'Jl. Raya 2',
        totalItem: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        warehouseId: 3,
        status: 'pending',
        trackingCode: '234',
        totalPrice: 20000,
        address: 'Jl. Raya 3',
        totalItem: 10,
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
    await queryInterface.bulkDelete('Orders', null, {})
  }
};
