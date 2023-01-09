import {
  GET_PROPERTIES_REQUEST,
  GET_PROPERTIES_SUCCESS,
  GET_PROPERTIES_FAIL,
  GET_PROPERTYDETAIL_REQUEST,
  GET_PROPERTYDETAIL_SUCCESS,
  GET_PROPERTYDETAIL_FAIL,
  CLEAR_ERRORS,
  CREATE_PROPERTY_REQUEST,
  CREATE_PROPERTY_SUCCESS,
  CREATE_PROPERTY_RESET,
  CREATE_PROPERTY_FAIL,
  UPDATE_PROPERTY_REQUEST,
  UPDATE_PROPERTY_SUCCESS,
  UPDATE_PROPERTY_RESET,
  UPDATE_PROPERTY_FAIL,
  DELETE_PROPERTY_REQUEST,
  DELETE_PROPERTY_SUCCESS,
  DELETE_PROPERTY_RESET,
  DELETE_PROPERTY_FAIL,
} from "../constants/propertiesConstants";

export const createPropertyReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PROPERTY_REQUEST:
      return { loading: true };
    case CREATE_PROPERTY_SUCCESS:
      return { loading: false, success: true, property: action.payload };
    case CREATE_PROPERTY_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_PROPERTY_RESET:
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

export const updatePropertyReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROPERTY_REQUEST:
      return { loading: true };
    case UPDATE_PROPERTY_SUCCESS:
      return { loading: false, success: true, property: action.payload };
    case UPDATE_PROPERTY_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_PROPERTY_RESET:
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

export const getPropertiesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PROPERTIES_REQUEST:
      return { loading: true };
    case GET_PROPERTIES_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_PROPERTIES_FAIL:
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

export const getPropertyDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PROPERTYDETAIL_REQUEST:
      return { loading: true };
    case GET_PROPERTYDETAIL_SUCCESS:
      return { loading: false, property: action.payload };
    case GET_PROPERTYDETAIL_FAIL:
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

export const deletePropertyReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PROPERTY_REQUEST:
      return { loading: true };
    case DELETE_PROPERTY_SUCCESS:
      return { loading: false, success: true, property: action.payload };
    case DELETE_PROPERTY_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_PROPERTY_RESET:
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
