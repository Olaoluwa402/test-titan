import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_RESET,
  CLEAR_ERRORS,
  LOGIN_SUCCESS_RESET,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  GET_USERDETAIL_REQUEST,
  GET_USERDETAIL_SUCCESS,
  GET_USERDETAIL_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_RESET,
  UPDATE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_RESET,
  DELETE_USER_FAIL,
} from "../constants/userConstants";

let userInfoFromStorage = null;
const ISSERVER = typeof window === "undefined";

if (!ISSERVER) {
  userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
}

export const userLoginReducer = (
  state = { userInfo: userInfoFromStorage },
  action
) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    case LOGIN_SUCCESS_RESET:
      return {
        ...state,
        success: null,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, success: true, register: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_REGISTER_RESET:
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

export const updateUserReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
      return { loading: true };
    case UPDATE_USER_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case UPDATE_USER_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_USER_RESET:
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

export const getUsersReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return { loading: true };
    case GET_USERS_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_USERS_FAIL:
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

export const getUserDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USERDETAIL_REQUEST:
      return { loading: true };
    case GET_USERDETAIL_SUCCESS:
      return { loading: false, user: action.payload };
    case GET_USERDETAIL_FAIL:
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

export const deleteUserReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_USER_REQUEST:
      return { loading: true };
    case DELETE_USER_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case DELETE_USER_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_USER_RESET:
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
