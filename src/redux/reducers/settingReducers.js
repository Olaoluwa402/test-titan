import {
  GET_SETTING_REQUEST,
  GET_SETTING_SUCCESS,
  GET_SETTING_FAIL,
  CLEAR_ERRORS,
  CREATE_SETTING_REQUEST,
  CREATE_SETTING_SUCCESS,
  CREATE_SETTING_RESET,
  CREATE_SETTING_FAIL,
  UPDATE_SETTING_REQUEST,
  UPDATE_SETTING_SUCCESS,
  UPDATE_SETTING_RESET,
  UPDATE_SETTING_FAIL,
} from "../constants/settingConstants";

export const createSettingReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_SETTING_REQUEST:
      return { loading: true };
    case CREATE_SETTING_SUCCESS:
      return { loading: false, success: true, setting: action.payload };
    case CREATE_SETTING_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_SETTING_RESET:
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

export const updateSettingReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SETTING_REQUEST:
      return { loading: true };
    case UPDATE_SETTING_SUCCESS:
      return { loading: false, success: true, setting: action.payload };
    case UPDATE_SETTING_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_SETTING_RESET:
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

export const getSettingReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SETTING_REQUEST:
      return { loading: true };
    case GET_SETTING_SUCCESS:
      return { loading: false, setting: action.payload };
    case GET_SETTING_FAIL:
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
