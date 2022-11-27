"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable("clubplanbenefits", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      benefit: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      clubPlanId: { type: Sequelize.INTEGER, allowNull: false },
      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE },
    });
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.dropTable("clubplanbenefits");
  },
};
