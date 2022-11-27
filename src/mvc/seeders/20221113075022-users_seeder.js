"use strict";
const sampleData = require("../data.js");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", sampleData.users, {});

    const users = await queryInterface.sequelize.query(`SELECT id from USERS`);

    // properties
    const userRows = users[0];
    const properties = sampleData.properties.map((item) => {
      return { ...item, ownerId: userRows[0].id };
    });
    await queryInterface.bulkInsert("properties", properties, {});

    //property_plans
    const prop = await queryInterface.sequelize.query(
      `SELECT id from PROPERTIES;`
    );

    const propertyRows = prop[0];
    const property_plans_1 = sampleData.property_plans.map((item, i) => {
      return { ...item, propertyId: propertyRows[0].id };
    });
    await queryInterface.bulkInsert("propertyplans", property_plans_1, {});

    const property_plans_2 = sampleData.property_plans.map((item, i) => {
      return { ...item, propertyId: propertyRows[1].id };
    });
    await queryInterface.bulkInsert("propertyplans", property_plans_2, {});

    const property_plans_3 = sampleData.property_plans.map((item, i) => {
      return { ...item, propertyId: propertyRows[2].id };
    });
    await queryInterface.bulkInsert("propertyplans", property_plans_3, {});
    const property_plans_4 = sampleData.property_plans.map((item, i) => {
      return { ...item, propertyId: propertyRows[3].id };
    });
    await queryInterface.bulkInsert("propertyplans", property_plans_4, {});

    //facilities
    const facilities_1 = sampleData.facilities.map((item, i) => {
      return { ...item, propertyId: propertyRows[0].id };
    });

    await queryInterface.bulkInsert("facilities", facilities_1, {});

    const facilities_2 = sampleData.facilities.map((item, i) => {
      return { ...item, propertyId: propertyRows[1].id };
    });

    await queryInterface.bulkInsert("facilities", facilities_2, {});

    const facilities_3 = sampleData.facilities.map((item, i) => {
      return { ...item, propertyId: propertyRows[2].id };
    });

    await queryInterface.bulkInsert("facilities", facilities_3, {});

    const facilities_4 = sampleData.facilities.map((item, i) => {
      return { ...item, propertyId: propertyRows[3].id };
    });

    await queryInterface.bulkInsert("facilities", facilities_4, {});

    //images
    const property_images_1 = sampleData.property_images.map((item, i) => {
      return { ...item, propertyId: propertyRows[0].id };
    });
    await queryInterface.bulkInsert("images", property_images_1, {});

    const property_images_2 = sampleData.property_images.map((item, i) => {
      return { ...item, propertyId: propertyRows[1].id };
    });
    await queryInterface.bulkInsert("images", property_images_2, {});

    const property_images_3 = sampleData.property_images.map((item, i) => {
      return { ...item, propertyId: propertyRows[2].id };
    });
    await queryInterface.bulkInsert("images", property_images_3, {});

    const property_images_4 = sampleData.property_images.map((item, i) => {
      return { ...item, propertyId: propertyRows[3].id };
    });
    await queryInterface.bulkInsert("images", property_images_4, {});

    //propert_features
    const property_features_1 = sampleData.property_features.map((item, i) => {
      return { ...item, propertyId: propertyRows[0].id };
    });

    await queryInterface.bulkInsert(
      "propertyfeatures",
      property_features_1,
      {}
    );

    const property_features_2 = sampleData.property_features.map((item, i) => {
      return { ...item, propertyId: propertyRows[1].id };
    });

    await queryInterface.bulkInsert(
      "propertyfeatures",
      property_features_2,
      {}
    );

    const property_features_3 = sampleData.property_features.map((item, i) => {
      return { ...item, propertyId: propertyRows[2].id };
    });

    await queryInterface.bulkInsert(
      "propertyfeatures",
      property_features_3,
      {}
    );

    const property_features_4 = sampleData.property_features.map((item, i) => {
      return { ...item, propertyId: propertyRows[3].id };
    });

    return await queryInterface.bulkInsert(
      "propertyfeatures",
      property_features_4,
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("users", null, {});
  },
};
