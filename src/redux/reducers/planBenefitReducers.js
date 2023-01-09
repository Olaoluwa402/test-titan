import {
  GET_PLANBENEFITS_REQUEST,
  GET_PLANBENEFITS_SUCCESS,
  GET_PLANBENEFITS_FAIL,
  GET_PLANBENEFITDETAIL_REQUEST,
  GET_PLANBENEFITDETAIL_SUCCESS,
  GET_PLANBENEFITDETAIL_FAIL,
  CLEAR_ERRORS,
  CREATE_PLANBENEFIT_REQUEST,
  CREATE_PLANBENEFIT_SUCCESS,
  CREATE_PLANBENEFIT_RESET,
  CREATE_PLANBENEFIT_FAIL,
  UPDATE_PLANBENEFIT_REQUEST,
  UPDATE_PLANBENEFIT_SUCCESS,
  UPDATE_PLANBENEFIT_RESET,
  UPDATE_PLANBENEFIT_FAIL,
  DELETE_PLANBENEFIT_REQUEST,
  DELETE_PLANBENEFIT_SUCCESS,
  DELETE_PLANBENEFIT_RESET,
  DELETE_PLANBENEFIT_FAIL,
} from "../constants/planBenefitConstants";

export const createPlanBenefitReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PLANBENEFIT_REQUEST:
      return { loading: true };
    case CREATE_PLANBENEFIT_SUCCESS:
      return { loading: false, success: true, benefit: action.payload };
    case CREATE_PLANBENEFIT_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_PLANBENEFIT_RESET:
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

export const updatePlanBenefitReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PLANBENEFIT_REQUEST:
      return { loading: true };
    case UPDATE_PLANBENEFIT_SUCCESS:
      return { loading: false, success: true, benefit: action.payload };
    case UPDATE_PLANBENEFIT_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_PLANBENEFIT_RESET:
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

export const getPlanBenefitsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PLANBENEFITS_REQUEST:
      return { loading: true };
    case GET_PLANBENEFITS_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_PLANBENEFITS_FAIL:
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

export const getPlanBenefitDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PLANBENEFITDETAIL_REQUEST:
      return { loading: true };
    case GET_PLANBENEFITDETAIL_SUCCESS:
      return { loading: false, benefit: action.payload };
    case GET_PLANBENEFITDETAIL_FAIL:
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

export const deletePlanBenefitReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PLANBENEFIT_REQUEST:
      return { loading: true };
    case DELETE_PLANBENEFIT_SUCCESS:
      return { loading: false, success: true, benefit: action.payload };
    case DELETE_PLANBENEFIT_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_PLANBENEFIT_RESET:
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
