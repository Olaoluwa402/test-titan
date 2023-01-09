import {
  GET_HOMEDATA_REQUEST,
  GET_HOMEDATA_SUCCESS,
  GET_HOMEDATA_FAIL,
  GET_CLUBPLAN_REQUEST,
  GET_CLUBPLAN_SUCCESS,
  GET_CLUBPLAN_FAIL,
  GET_ABOUT_REQUEST,
  GET_ABOUT_SUCCESS,
  GET_ABOUT_FAIL,
  GET_ABOUT_RESET,
  UPDATE_ABOUT_REQUEST,
  UPDATE_ABOUT_SUCCESS,
  UPDATE_ABOUT_FAIL,
  UPDATE_ABOUT_RESET,
  CLEAR_ERRORS,
} from "../constants/generalConstants";

let homeDataFromStorage = null;
const ISSERVER = typeof window === "undefined";

if (!ISSERVER) {
  homeDataFromStorage = localStorage.getItem("homeData")
    ? JSON.parse(localStorage.getItem("homeData"))
    : null;
}

console.log(homeDataFromStorage, "homeDataFromStorage");

export const getHomeDataReducer = (
  state = { data: homeDataFromStorage },
  action
) => {
  switch (action.type) {
    case GET_HOMEDATA_REQUEST:
      return { loading: true };
    case GET_HOMEDATA_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_HOMEDATA_FAIL:
      return { loading: false, error: action.payload };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const getAllClubPlanReducer = (state = { plans: [] }, action) => {
  switch (action.type) {
    case GET_CLUBPLAN_REQUEST:
      return { loading: true };
    case GET_CLUBPLAN_SUCCESS:
      return { loading: false, plans: action.payload };
    case GET_CLUBPLAN_FAIL:
      return { loading: false, error: action.payload };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const getAboutReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ABOUT_REQUEST:
      return { loading: true };
    case GET_ABOUT_SUCCESS:
      return { loading: false, success: true, about: action.payload };
    case GET_ABOUT_FAIL:
      return { loading: false, error: action.payload };
    case GET_ABOUT_RESET:
      return {};
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const updateAboutReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ABOUT_REQUEST:
      return { loading: true };
    case UPDATE_ABOUT_SUCCESS:
      return { loading: false, success: true, about: action.payload };
    case UPDATE_ABOUT_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_ABOUT_RESET:
      return {};
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
