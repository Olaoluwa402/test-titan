import {
  GET_HOMEDATA_REQUEST,
  GET_HOMEDATA_SUCCESS,
  GET_HOMEDATA_FAIL,
  GET_CLUBPLAN_REQUEST,
  GET_CLUBPLAN_SUCCESS,
  GET_CLUBPLAN_FAIL,
  CLEAR_ERRORS,
} from "../constants/generalConstants";

export const getHomeDataReducer = (state = {}, action) => {
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
