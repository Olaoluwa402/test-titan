"use strict";
const sampleData = require("../data.js");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("services", sampleData.services, {});

    const service = await queryInterface.sequelize.query(
      `SELECT id from SERVICES;`
    );

    // services
    const serviceRows = service[0];
    const serviceMenu = sampleData.serviceMenu.map((item) => {
      return { ...item, serviceId: serviceRows[0].id };
    });

    await queryInterface.bulkInsert("servicemenus", serviceMenu, {});
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("services", null, {});
  },
};
