"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable("properties", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      video_url: { type: Sequelize.STRING, allowNull: false },
      videoUrlId: { type: Sequelize.STRING, allowNull: true },
      title: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: false },
      pricing: { type: Sequelize.STRING, allowNull: false },
      location: { type: Sequelize.STRING, allowNull: false },
      no_of_beds: { type: Sequelize.STRING, allowNull: false },
      extra_info: { type: Sequelize.STRING, allowNull: false },
      ownerId: { type: Sequelize.INTEGER, allowNull: false },
      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE },
    });
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.dropTable("properties");
  },
};
