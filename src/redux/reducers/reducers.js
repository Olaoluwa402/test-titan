import { combineReducers } from "redux";

import { userRegisterReducer, userLoginReducer } from "./userReducers";
import { getHomeDataReducer, getAllClubPlanReducer } from "./generalReducers";
import { registerClubPlanReducer } from "./clubPlanReducers";
registerClubPlanReducer;
import {
  getPropertiesReducer,
  getPropertyDetailReducer,
} from "./propertiesReducers";

const reducers = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  homeData: getHomeDataReducer,
  clubPlans: getAllClubPlanReducer,
  properties: getPropertiesReducer,
  propertyDetail: getPropertyDetailReducer,
  registerClubPlan: registerClubPlanReducer,
});

export default reducers;
