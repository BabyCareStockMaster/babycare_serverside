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
    await queryInterface.bulkInsert('ProductGalleries', [
      {
        productId: 1,
        imageUrl: 'https://source.unsplash.com/1600x900/?baby',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 2,
        imageUrl: 'https://source.unsplash.com/1600x900/?baby',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 3,
        imageUrl: 'https://source.unsplash.com/1600x900/?baby',
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
    await queryInterface.bulkDelete('ProductGalleries', null, {})
  }
};
