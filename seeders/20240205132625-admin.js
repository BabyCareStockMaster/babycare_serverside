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
    await queryInterface.bulkInsert('Admins', [
      {
        username: 'admin',
        email: 'admin@admin',
        password: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'admin2',
        email: 'admin2@admin',
        password: 'admin2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'admin3',
        email: 'admin3@admin',
        password: 'admin3',
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
    await queryInterface.bulkDelete('Admins', null, {})
  }
};
