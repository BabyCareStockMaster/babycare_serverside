"use strict";
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Admins",
      [
        {
          first_name: "John",
          last_name: "Doe",
          email: "JohnDoe@gmail.com",
          username: "admin",
          password: await bcrypt.hash("admin", 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          first_name: "naruto",
          last_name: "sasuke",
          email: "sasu_naru69@outlook.com",
          username: "postgres",
          password: await bcrypt.hash("postgres", 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Admins", null, {restartIdentity: true ,truncate: true, cascade: true});
  },
};
