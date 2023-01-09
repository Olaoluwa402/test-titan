import {
  GET_FLOORPLANS_REQUEST,
  GET_FLOORPLANS_SUCCESS,
  GET_FLOORPLANS_FAIL,
  GET_FLOORPLANDETAIL_REQUEST,
  GET_FLOORPLANDETAIL_SUCCESS,
  GET_FLOORPLANDETAIL_FAIL,
  CLEAR_ERRORS,
  CREATE_FLOORPLAN_REQUEST,
  CREATE_FLOORPLAN_SUCCESS,
  CREATE_FLOORPLAN_RESET,
  CREATE_FLOORPLAN_FAIL,
  UPDATE_FLOORPLAN_REQUEST,
  UPDATE_FLOORPLAN_SUCCESS,
  UPDATE_FLOORPLAN_RESET,
  UPDATE_FLOORPLAN_FAIL,
  DELETE_FLOORPLAN_REQUEST,
  DELETE_FLOORPLAN_SUCCESS,
  DELETE_FLOORPLAN_RESET,
  DELETE_FLOORPLAN_FAIL,
} from "../constants/floorPlanConstants";

export const createFloorPlanReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_FLOORPLAN_REQUEST:
      return { loading: true };
    case CREATE_FLOORPLAN_SUCCESS:
      return { loading: false, success: true, plan: action.payload };
    case CREATE_FLOORPLAN_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_FLOORPLAN_RESET:
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

export const updateFloorPlanReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_FLOORPLAN_REQUEST:
      return { loading: true };
    case UPDATE_FLOORPLAN_SUCCESS:
      return { loading: false, success: true, plan: action.payload };
    case UPDATE_FLOORPLAN_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_FLOORPLAN_RESET:
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

export const getFloorPlansReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_FLOORPLANS_REQUEST:
      return { loading: true };
    case GET_FLOORPLANS_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_FLOORPLANS_FAIL:
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

export const getFloorPlanDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_FLOORPLANDETAIL_REQUEST:
      return { loading: true };
    case GET_FLOORPLANDETAIL_SUCCESS:
      return { loading: false, plan: action.payload };
    case GET_FLOORPLANDETAIL_FAIL:
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

export const deleteFloorPlanReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_FLOORPLAN_REQUEST:
      return { loading: true };
    case DELETE_FLOORPLAN_SUCCESS:
      return { loading: false, success: true, plan: action.payload };
    case DELETE_FLOORPLAN_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_FLOORPLAN_RESET:
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
