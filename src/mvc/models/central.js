import ClubPlan from "./ClubPlan.js";
import ClubPlanBenefit from "./ClubPlanBenefit.js";
import Facility from "./Facility.js";
import Image from "./Image.js";
import Membership from "./Membership.js";
import Property from "./Property.js";
import PropertyPlan from "./PropertyPlan.js";
import PropertyFeature from "./PropertyFeature.js";
import User from "./User.js";
import Quotation from "./Quotation.js";
import Setting from "./Setting.js";
import Slider from "./Slider.js";
import Team from "./Team.js";
import MenuItem from "./MenuItem.js";
import Service from "./Service.js";
import ServiceMenu from "./ServiceMenu.js";
import Value from "./Value.js";
import ValueMenu from "./ValueMenu.js";

import db from "../database/db.js";

ClubPlan.hasMany(Membership, { as: "members", foreignKey: "clubPlanId" }); //clubplan can have many member
Membership.belongsTo(ClubPlan, { as: "clubPlan", foreignKey: "clubPlanId" }); //member can only have one plan

ClubPlan.hasMany(ClubPlanBenefit, { as: "benefits", foreignKey: "clubPlanId" }); //clubplan can have many member
ClubPlanBenefit.belongsTo(ClubPlan, {
  as: "membershipPlan",
  foreignKey: "clubPlanId",
}); //member can only have one plan

// User.hasMany(Membership, { as: "referrals", foreignKey: "referralId" }); //User can have many referral
// Membership.belongsTo(User, { as: "referral", foreignKey: "referralId" }); //member can only have one referral

Property.hasMany(Facility, { as: "facilities", foreignKey: "propertyId" });
// Facility.belongsTo(Property);

User.hasMany(Property, { as: "properties", foreignKey: "ownerId" }); //User can have many referral
Property.belongsTo(User, { as: "owner", foreignKey: "ownerId" }); //member can only have one referral

Property.hasMany(PropertyPlan, {
  as: "propertyPlans",
  foreignKey: "propertyId",
});
// PropertyPlan.belongsTo(Property);

Property.hasMany(PropertyFeature, {
  as: "propertyFeatures",
  foreignKey: "propertyId",
});
// PropertyFeature.belongsTo(Property);

Property.hasMany(Image, {
  as: "images",
  foreignKey: "propertyId",
});
// Image.belongsTo(Property);

Service.hasMany(ServiceMenu, {
  as: "ServiceMenu",
  foreignKey: "serviceId",
});

Value.hasMany(ValueMenu, {
  as: "ValueMenu",
  foreignKey: "valueId",
});
//

// Test DB
db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

db.sync().then(() => {
  console.log("tables created");
});

export {
  Membership,
  ClubPlan,
  ClubPlanBenefit,
  Facility,
  User,
  PropertyFeature,
  PropertyPlan,
  Image,
  Property,
  Quotation,
  Slider,
  Team,
  Setting,
  MenuItem,
  Service,
  ServiceMenu,
  Value,
  ValueMenu,
};
