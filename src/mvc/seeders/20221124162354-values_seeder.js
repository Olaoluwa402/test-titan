"use strict";
const sampleData = require("../data.js");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("valuezes", sampleData.values, {});

    const value = await queryInterface.sequelize.query(
      `SELECT id from VALUEZES;`
    );

    // values
    const valueRows = value[0];
    const valueMenu = sampleData.valueMenu.map((item) => {
      return { ...item, valueId: valueRows[0].id };
    });

    await queryInterface.bulkInsert("valuemenus", valueMenu, {});
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("valuezes", null, {});
  },
};
