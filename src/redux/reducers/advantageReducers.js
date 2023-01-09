import {
  GET_ADVANTAGES_REQUEST,
  GET_ADVANTAGES_SUCCESS,
  GET_ADVANTAGES_FAIL,
  GET_ADVANTAGEDETAIL_REQUEST,
  GET_ADVANTAGEDETAIL_SUCCESS,
  GET_ADVANTAGEDETAIL_FAIL,
  CLEAR_ERRORS,
  CREATE_ADVANTAGE_REQUEST,
  CREATE_ADVANTAGE_SUCCESS,
  CREATE_ADVANTAGE_RESET,
  CREATE_ADVANTAGE_FAIL,
  UPDATE_ADVANTAGE_REQUEST,
  UPDATE_ADVANTAGE_SUCCESS,
  UPDATE_ADVANTAGE_RESET,
  UPDATE_ADVANTAGE_FAIL,
  DELETE_ADVANTAGE_REQUEST,
  DELETE_ADVANTAGE_SUCCESS,
  DELETE_ADVANTAGE_RESET,
  DELETE_ADVANTAGE_FAIL,
} from "../constants/advantageConstants";

export const createAdvantageReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ADVANTAGE_REQUEST:
      return { loading: true };
    case CREATE_ADVANTAGE_SUCCESS:
      return { loading: false, success: true, advantage: action.payload };
    case CREATE_ADVANTAGE_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_ADVANTAGE_RESET:
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

export const updateAdvantageReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ADVANTAGE_REQUEST:
      return { loading: true };
    case UPDATE_ADVANTAGE_SUCCESS:
      return { loading: false, success: true, advantage: action.payload };
    case UPDATE_ADVANTAGE_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_ADVANTAGE_RESET:
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

export const getAvantagesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ADVANTAGES_REQUEST:
      return { loading: true };
    case GET_ADVANTAGES_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_ADVANTAGES_FAIL:
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

export const getAdvantageDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ADVANTAGEDETAIL_REQUEST:
      return { loading: true };
    case GET_ADVANTAGEDETAIL_SUCCESS:
      return { loading: false, advantage: action.payload };
    case GET_ADVANTAGEDETAIL_FAIL:
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

export const deleteAdvantageReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ADVANTAGE_REQUEST:
      return { loading: true };
    case DELETE_ADVANTAGE_SUCCESS:
      return { loading: false, success: true, advantage: action.payload };
    case DELETE_ADVANTAGE_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_ADVANTAGE_RESET:
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
