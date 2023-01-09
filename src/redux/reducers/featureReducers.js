import {
  GET_FEATURES_REQUEST,
  GET_FEATURES_SUCCESS,
  GET_FEATURES_FAIL,
  GET_FEATUREDETAIL_REQUEST,
  GET_FEATUREDETAIL_SUCCESS,
  GET_FEATUREDETAIL_FAIL,
  CLEAR_ERRORS,
  CREATE_FEATURE_REQUEST,
  CREATE_FEATURE_SUCCESS,
  CREATE_FEATURE_RESET,
  CREATE_FEATURE_FAIL,
  UPDATE_FEATURE_REQUEST,
  UPDATE_FEATURE_SUCCESS,
  UPDATE_FEATURE_RESET,
  UPDATE_FEATURE_FAIL,
  DELETE_FEATURE_REQUEST,
  DELETE_FEATURE_SUCCESS,
  DELETE_FEATURE_RESET,
  DELETE_FEATURE_FAIL,
} from "../constants/featureConstants";

export const createFeatureReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_FEATURE_REQUEST:
      return { loading: true };
    case CREATE_FEATURE_SUCCESS:
      return { loading: false, success: true, feature: action.payload };
    case CREATE_FEATURE_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_FEATURE_RESET:
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

export const updateFeatureReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_FEATURE_REQUEST:
      return { loading: true };
    case UPDATE_FEATURE_SUCCESS:
      return { loading: false, success: true, feature: action.payload };
    case UPDATE_FEATURE_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_FEATURE_RESET:
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

export const getFeaturesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_FEATURES_REQUEST:
      return { loading: true };
    case GET_FEATURES_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_FEATURES_FAIL:
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

export const getFeatureDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_FEATUREDETAIL_REQUEST:
      return { loading: true };
    case GET_FEATUREDETAIL_SUCCESS:
      return { loading: false, feature: action.payload };
    case GET_FEATUREDETAIL_FAIL:
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

export const deleteFeatureReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_FEATURE_REQUEST:
      return { loading: true };
    case DELETE_FEATURE_SUCCESS:
      return { loading: false, success: true, feature: action.payload };
    case DELETE_FEATURE_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_FEATURE_RESET:
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
