import {
  GET_CLUBPLANS_REQUEST,
  GET_CLUBPLANS_SUCCESS,
  GET_CLUBPLANS_FAIL,
  GET_CLUBPLANDETAIL_REQUEST,
  GET_CLUBPLANDETAIL_SUCCESS,
  GET_CLUBPLANDETAIL_FAIL,
  CLEAR_ERRORS,
  CREATE_CLUBPLAN_REQUEST,
  CREATE_CLUBPLAN_SUCCESS,
  CREATE_CLUBPLAN_RESET,
  CREATE_CLUBPLAN_FAIL,
  UPDATE_CLUBPLAN_REQUEST,
  UPDATE_CLUBPLAN_SUCCESS,
  UPDATE_CLUBPLAN_RESET,
  UPDATE_CLUBPLAN_FAIL,
  DELETE_CLUBPLAN_REQUEST,
  DELETE_CLUBPLAN_SUCCESS,
  DELETE_CLUBPLAN_RESET,
  DELETE_CLUBPLAN_FAIL,
} from "../constants/clubPlanConstants";

export const createClubPlanReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_CLUBPLAN_REQUEST:
      return { loading: true };
    case CREATE_CLUBPLAN_SUCCESS:
      return { loading: false, success: true, clubplan: action.payload };
    case CREATE_CLUBPLAN_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_CLUBPLAN_RESET:
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

export const updateClubPlanReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_CLUBPLAN_REQUEST:
      return { loading: true };
    case UPDATE_CLUBPLAN_SUCCESS:
      return { loading: false, success: true, clubplan: action.payload };
    case UPDATE_CLUBPLAN_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_CLUBPLAN_RESET:
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

export const getClubPlansReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CLUBPLANS_REQUEST:
      return { loading: true };
    case GET_CLUBPLANS_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_CLUBPLANS_FAIL:
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

export const getClubPlanDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CLUBPLANDETAIL_REQUEST:
      return { loading: true };
    case GET_CLUBPLANDETAIL_SUCCESS:
      return { loading: false, clubplan: action.payload };
    case GET_CLUBPLANDETAIL_FAIL:
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

export const deleteClubPlanReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CLUBPLAN_REQUEST:
      return { loading: true };
    case DELETE_CLUBPLAN_SUCCESS:
      return { loading: false, success: true, clubplan: action.payload };
    case DELETE_CLUBPLAN_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_CLUBPLAN_RESET:
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
