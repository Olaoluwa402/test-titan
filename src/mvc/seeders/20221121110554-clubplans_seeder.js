"use strict";
const sampleData = require("../data.js");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("clubplans", sampleData.clubPlans, {});

    const clubPlan = await queryInterface.sequelize.query(
      `SELECT id from clubplans;`
    );

    const clubPlanRows = clubPlan[0];
    const clubPlanBenefits_1 = sampleData.clubPlanBenefits.map((item) => {
      return { ...item, clubPlanId: clubPlanRows[0].id };
    });

    await queryInterface.bulkInsert("clubplanbenefits", clubPlanBenefits_1, {});

    const clubPlanBenefits_2 = sampleData.clubPlanBenefits.map((item) => {
      return { ...item, clubPlanId: clubPlanRows[1].id };
    });

    await queryInterface.bulkInsert("clubplanbenefits", clubPlanBenefits_2, {});

    const clubPlanBenefits_3 = sampleData.clubPlanBenefits.map((item) => {
      return { ...item, clubPlanId: clubPlanRows[2].id };
    });

    await queryInterface.bulkInsert("clubplanbenefits", clubPlanBenefits_3, {});

    // membership
    const memberships_1 = sampleData.memberships.map((item) => {
      return {
        ...item,
        clubPlanId: clubPlanRows[0].id,
      };
    });
    await queryInterface.bulkInsert("memberships", memberships_1, {});

    const memberships_2 = sampleData.memberships.map((item) => {
      return {
        ...item,
        clubPlanId: clubPlanRows[1].id,
      };
    });
    await queryInterface.bulkInsert("memberships", memberships_2, {});

    const memberships_3 = sampleData.memberships.map((item) => {
      return {
        ...item,
        clubPlanId: clubPlanRows[2].id,
      };
    });
    await queryInterface.bulkInsert("memberships", memberships_3, {});
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("clubplans", null, {});
  },
};
