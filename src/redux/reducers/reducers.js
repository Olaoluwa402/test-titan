import { combineReducers } from "redux";

import {
  userRegisterReducer,
  userLoginReducer,
  getUserDetailReducer,
  getUsersReducer,
  updateUserReducer,
  deleteUserReducer,
} from "./userReducers";
import {
  getHomeDataReducer,
  getAllClubPlanReducer,
  getAboutReducer,
  updateAboutReducer,
} from "./generalReducers";
import {
  createClubPlanReducer,
  updateClubPlanReducer,
  getClubPlanDetailReducer,
  getClubPlansReducer,
  deleteClubPlanReducer,
} from "./clubPlanReducers";

import {
  createQuoteReducer,
  updateQuoteReducer,
  getQuoteDetailReducer,
  getQuotesReducer,
  deleteQuoteReducer,
  openQuoteReducer,
} from "./QuoteReducers";

import {
  createPlanBenefitReducer,
  updatePlanBenefitReducer,
  getPlanBenefitDetailReducer,
  getPlanBenefitsReducer,
  deletePlanBenefitReducer,
} from "./planBenefitReducers";

import {
  getPropertiesReducer,
  getPropertyDetailReducer,
  createPropertyReducer,
  deletePropertyReducer,
  updatePropertyReducer,
} from "./propertiesReducers";

import {
  getMembersReducer,
  getMemberDetailReducer,
  createMemberReducer,
  deleteMemberReducer,
  updateMemberReducer,
} from "./memberReducers";

import {
  getSettingReducer,
  createSettingReducer,
  updateSettingReducer,
} from "./settingReducers";

import {
  getFeaturesReducer,
  getFeatureDetailReducer,
  createFeatureReducer,
  deleteFeatureReducer,
  updateFeatureReducer,
} from "./featureReducers.js";

import {
  getFloorPlansReducer,
  getFloorPlanDetailReducer,
  createFloorPlanReducer,
  deleteFloorPlanReducer,
  updateFloorPlanReducer,
} from "./floorPlanReducers";

import {
  getAvantagesReducer,
  getAdvantageDetailReducer,
  createAdvantageReducer,
  deleteAdvantageReducer,
  updateAdvantageReducer,
} from "./advantageReducers.js";

import {
  getFacilitiesReducer,
  getFacilityDetailReducer,
  createFacilityReducer,
  deleteFacilityReducer,
  updateFacilityReducer,
} from "./facilitiesReducers";

import {
  getImagesReducer,
  getImageDetailReducer,
  createImageReducer,
  deleteImageReducer,
  updateImageReducer,
} from "./imageReducers.js";

const reducers = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetail: getUserDetailReducer,
  updateUser: updateUserReducer,
  allUsers: getUsersReducer,
  deleteUser: deleteUserReducer,
  homeData: getHomeDataReducer,
  clubPlans: getAllClubPlanReducer,

  getAbout: getAboutReducer,
  updateAbout: updateAboutReducer,

  //properties
  properties: getPropertiesReducer,
  propertyDetail: getPropertyDetailReducer,
  deleteProperty: deletePropertyReducer,
  updateProperty: updatePropertyReducer,
  newProperty: createPropertyReducer,

  //facilities
  facilities: getFacilitiesReducer,
  facilityDetail: getFacilityDetailReducer,
  deleteFacility: deleteFacilityReducer,
  updateFacility: updateFacilityReducer,
  newFacility: createFacilityReducer,

  //images
  images: getImagesReducer,
  imageDetail: getImageDetailReducer,
  deleteImage: deleteImageReducer,
  updateImage: updateImageReducer,
  newImage: createImageReducer,
  //features
  features: getFeaturesReducer,
  featureDetail: getFeatureDetailReducer,
  deleteFeature: deleteFeatureReducer,
  updateFeature: updateFeatureReducer,
  newFeature: createFeatureReducer,

  //floor plans
  floorPlans: getFloorPlansReducer,
  floorPlanDetail: getFloorPlanDetailReducer,
  deleteFloorPlan: deleteFloorPlanReducer,
  updateFloorPlan: updateFloorPlanReducer,
  newFloorPlan: createFloorPlanReducer,
  //advantages
  advantages: getAvantagesReducer,
  advantageDetail: getAdvantageDetailReducer,
  deleteAdvantage: deleteAdvantageReducer,
  updateAdvantage: updateAdvantageReducer,
  newAdvantage: createAdvantageReducer,

  //members
  allMembers: getMembersReducer,
  memberDetail: getMemberDetailReducer,
  deleteMember: deleteMemberReducer,
  updateMember: updateMemberReducer,
  newMember: createMemberReducer,

  //settings
  settingDetail: getSettingReducer,
  updateSetting: updateSettingReducer,
  newSetting: createSettingReducer,

  //club plan
  allClubPlans: getClubPlansReducer,
  clubPlanDetail: getClubPlanDetailReducer,
  deleteClubPlan: deleteClubPlanReducer,
  updateClubPlan: updateClubPlanReducer,
  newClubPlan: createClubPlanReducer,

  //quotes
  allQuotes: getQuotesReducer,
  QuoteDetail: getQuoteDetailReducer,
  deleteQuote: deleteQuoteReducer,
  updateQuote: updateQuoteReducer,
  newQuote: createQuoteReducer,
  openQuote: openQuoteReducer,

  //club plan benefit
  allBenefits: getPlanBenefitsReducer,
  benefitDetail: getPlanBenefitDetailReducer,
  deleteBenefit: deletePlanBenefitReducer,
  updateBenefit: updatePlanBenefitReducer,
  newBenefit: createPlanBenefitReducer,
});

export default reducers;
