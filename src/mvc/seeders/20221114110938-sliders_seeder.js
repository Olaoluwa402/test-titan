"use strict";
const sampleData = require("../data.js");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("sliders", sampleData.sliders, {});
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("sliders", null, {});
  },
};
