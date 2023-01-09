import {
  GET_FACILITIES_REQUEST,
  GET_FACILITIES_SUCCESS,
  GET_FACILITIES_FAIL,
  GET_FACILITYDETAIL_REQUEST,
  GET_FACILITYDETAIL_SUCCESS,
  GET_FACILITYDETAIL_FAIL,
  CLEAR_ERRORS,
  CREATE_FACILITY_REQUEST,
  CREATE_FACILITY_SUCCESS,
  CREATE_FACILITY_RESET,
  CREATE_FACILITY_FAIL,
  UPDATE_FACILITY_REQUEST,
  UPDATE_FACILITY_SUCCESS,
  UPDATE_FACILITY_RESET,
  UPDATE_FACILITY_FAIL,
  DELETE_FACILITY_REQUEST,
  DELETE_FACILITY_SUCCESS,
  DELETE_FACILITY_RESET,
  DELETE_FACILITY_FAIL,
} from "../constants/facilityConstants.js";

export const createFacilityReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_FACILITY_REQUEST:
      return { loading: true };
    case CREATE_FACILITY_SUCCESS:
      return { loading: false, success: true, facility: action.payload };
    case CREATE_FACILITY_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_FACILITY_RESET:
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

export const updateFacilityReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_FACILITY_REQUEST:
      return { loading: true };
    case UPDATE_FACILITY_SUCCESS:
      return { loading: false, success: true, facility: action.payload };
    case UPDATE_FACILITY_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_FACILITY_RESET:
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

export const getFacilitiesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_FACILITIES_REQUEST:
      return { loading: true };
    case GET_FACILITIES_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_FACILITIES_FAIL:
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

export const getFacilityDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_FACILITYDETAIL_REQUEST:
      return { loading: true };
    case GET_FACILITYDETAIL_SUCCESS:
      return { loading: false, facility: action.payload };
    case GET_FACILITYDETAIL_FAIL:
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

export const deleteFacilityReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_FACILITY_REQUEST:
      return { loading: true };
    case DELETE_FACILITY_SUCCESS:
      return { loading: false, success: true, facility: action.payload };
    case DELETE_FACILITY_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_FACILITY_RESET:
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
