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
      aboutUsTitle: { type: Sequelize.STRING, allowNull: false },
      aboutUsText: { type: Sequelize.STRING, allowNull: false },
      company_address: { type: Sequelize.STRING, allowNull: false },
      aboutUsImage: { type: Sequelize.STRING, allowNull: false },
      aboutUsImageId: { type: Sequelize.STRING, allowNull: true },
      ourVisionTitle: { type: Sequelize.STRING, allowNull: false },
      ourVisionText: { type: Sequelize.STRING, allowNull: false },
      ourVisionImage: { type: Sequelize.STRING, allowNull: false },
      ourVisionImageId: { type: Sequelize.STRING, allowNull: true },
      ourServiceTitle: { type: Sequelize.STRING, allowNull: false },
      ourServiceText: { type: Sequelize.STRING, allowNull: false },
      ourServiceImage: { type: Sequelize.STRING, allowNull: false },
      ourServiceImageId: { type: Sequelize.STRING, allowNull: true },
      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE },
    });
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.dropTable("settings");
  },
};
