"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable("settings", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      email: { type: Sequelize.STRING, allowNull: false },
      phone: { type: Sequelize.STRING, allowNull: false },
      getQuoteCTA: { type: Sequelize.STRING, allowNull: false },
      selectLocationPlaceholder: { type: Sequelize.STRING, allowNull: false },
      selectBedroomAmountPlaceholder: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      selectPriceRangePlaceholder: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      selectPropertyPlaceholder: { type: Sequelize.STRING, allowNull: false },

      company_address: { type: Sequelize.TEXT, allowNull: false },

      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE },
    });
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.dropTable("settings");
  },
};
