"use strict";
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          admin_id: 1,
          first_name: "John",
          last_name: "Doe",
          email: "JohnDoe@gmail.com",
          password: await bcrypt.hash("admin", 10),
          address: "Jln Apel no 27",
          company: "indomie",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          admin_id: 1,
          first_name: "Andrew",
          last_name: "Tate",
          email: "tate_andrew@outlook.com",
          password: await bcrypt.hash("postgres", 10),
          address: "Kalimantan Tenggara",
          company: "Obat Nyamuk",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          admin_id: 1,
          first_name: "Jane",
          last_name: "Smith",
          email: "jane.smith@example.com",
          password: await bcrypt.hash("password123", 10),
          address: "123 Main Street",
          company: "Baby Products Co.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },  
        {
          admin_id: 1,
          first_name: "Michael",
          last_name: "Johnson",
          email: "michael.johnson@example.com",
          password: await bcrypt.hash("mikepassword", 10),
          address: "456 Elm Avenue",
          company: "Baby Care Inc.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          admin_id: 1,
          first_name: "Emily",
          last_name: "Brown",
          email: "emily.brown@example.com",
          password: await bcrypt.hash("brownie", 10),
          address: "789 Oak Street",
          company: "Baby World",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, { restartIdentity: true, truncate: true, cascade: true });
  },
};
