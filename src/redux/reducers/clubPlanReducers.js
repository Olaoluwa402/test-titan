import {
  REGISTERCLUBPLAN_FAIL,
  REGISTERCLUBPLAN_REQUEST,
  REGISTERCLUBPLAN_SUCCESS,
  REGISTERCLUBPLAN_RESET,
  CLEAR_ERRORS,
} from "../constants/clubPlanConstants";

export const registerClubPlanReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTERCLUBPLAN_REQUEST:
      return { loading: true };
    case REGISTERCLUBPLAN_SUCCESS:
      return { loading: false, success: true, record: action.payload };
    case REGISTERCLUBPLAN_FAIL:
      return { loading: false, error: action.payload };
    case REGISTERCLUBPLAN_RESET:
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
