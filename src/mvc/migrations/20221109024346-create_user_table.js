"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable(
      "users",
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        email: {
          validate: { isEmail: true },
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        role: {
          type: Sequelize.ENUM,
          values: ["admin", "client", "super-admin"],
          allowNull: false,
          defaultValue: "admin",
        },
        emailIsVerified: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
          set(value) {
            const hasedPW = passwordHashed(value);
            this.setDataValue("password", hasedPW);
          },
        },
        createdAt: { type: Sequelize.DATE },
        updatedAt: { type: Sequelize.DATE },
      },
      {
        defaultScope: {
          attributes: { exclude: ["password"] },
        },
        scopes: {
          withPassword: {
            attributes: {},
          },
        },
      }
    );
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.dropTable("users");
  },
};
