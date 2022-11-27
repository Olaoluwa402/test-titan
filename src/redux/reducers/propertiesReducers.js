import {
  GET_PROPERTIES_REQUEST,
  GET_PROPERTIES_SUCCESS,
  GET_PROPERTIES_FAIL,
  GET_PROPERTYDETAIL_REQUEST,
  GET_PROPERTYDETAIL_SUCCESS,
  GET_PROPERTYDETAIL_FAIL,
  CLEAR_ERRORS,
} from "../constants/propertiesConstants";

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
