"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable("memberships", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      firstname: { type: Sequelize.STRING, allowNull: true },
      lastname: { type: Sequelize.STRING, allowNull: true },
      job_title: { type: Sequelize.STRING, allowNull: true },
      email: { type: Sequelize.STRING, allowNull: true },
      phone: { type: Sequelize.STRING, allowNull: true },
      marital_Status: {
        type: Sequelize.ENUM,
        values: ["single", "married"],
        allowNull: true,
        defaultValue: "single",
      },
      employment_status: {
        type: Sequelize.ENUM,
        values: ["employed", "unemployed", "self-employed", "student"],
        allowNull: true,
        defaultValue: "employed",
      },
      join_date: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      },
      heard_about: { type: Sequelize.STRING, allowNull: true },
      clubPlanId: { type: Sequelize.INTEGER, allowNull: false },
      refer_friend: { type: Sequelize.STRING, allowNull: true },
      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE },
    });
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.dropTable("memberships");
  },
};
