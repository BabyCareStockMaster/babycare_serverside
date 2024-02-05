"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          name: "Pakaian Bayi",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pulvinar venenatis pharetra. Ut id neque orci. Suspendisse potenti. Cras interdum dui at semper sodales. Suspendisse aliquet, sapien at ornare suscipit. ",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Popok Bayi",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pulvinar venenatis pharetra. Ut id neque orci. Suspendisse potenti. Cras interdum dui at semper sodales. Suspendisse aliquet, sapien at ornare suscipit. ",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Peralatan mandi",
          description: " mandi dulu ",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Peralatan Makan",
          description: "makan ayam",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Peralatan Kulit",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pulvinar venenatis pharetra. Ut id neque orci. Suspendisse potenti. Cras interdum dui at semper sodales. Suspendisse aliquet, sapien at ornare suscipit. ",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Peralatan Lain-lain",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pulvinar venenatis pharetra. Ut id neque orci. Suspendisse potenti. Cras interdum dui at semper sodales. Suspendisse aliquet, sapien at ornare suscipit. ",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  },
};
