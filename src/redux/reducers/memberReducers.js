import {
  GET_MEMBERS_REQUEST,
  GET_MEMBERS_SUCCESS,
  GET_MEMBERS_FAIL,
  GET_MEMBERDETAIL_REQUEST,
  GET_MEMBERDETAIL_SUCCESS,
  GET_MEMBERDETAIL_FAIL,
  CLEAR_ERRORS,
  CREATE_MEMBER_REQUEST,
  CREATE_MEMBER_SUCCESS,
  CREATE_MEMBER_RESET,
  CREATE_MEMBER_FAIL,
  UPDATE_MEMBER_REQUEST,
  UPDATE_MEMBER_SUCCESS,
  UPDATE_MEMBER_RESET,
  UPDATE_MEMBER_FAIL,
  DELETE_MEMBER_REQUEST,
  DELETE_MEMBER_SUCCESS,
  DELETE_MEMBER_RESET,
  DELETE_MEMBER_FAIL,
} from "../constants/memberConstants";

export const createMemberReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_MEMBER_REQUEST:
      return { loading: true };
    case CREATE_MEMBER_SUCCESS:
      return { loading: false, success: true, record: action.payload };
    case CREATE_MEMBER_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_MEMBER_RESET:
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

export const updateMemberReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_MEMBER_REQUEST:
      return { loading: true };
    case UPDATE_MEMBER_SUCCESS:
      return { loading: false, success: true, member: action.payload };
    case UPDATE_MEMBER_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_MEMBER_RESET:
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

export const getMembersReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_MEMBERS_REQUEST:
      return { loading: true };
    case GET_MEMBERS_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_MEMBERS_FAIL:
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

export const getMemberDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_MEMBERDETAIL_REQUEST:
      return { loading: true };
    case GET_MEMBERDETAIL_SUCCESS:
      return { loading: false, member: action.payload };
    case GET_MEMBERDETAIL_FAIL:
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

export const deleteMemberReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_MEMBER_REQUEST:
      return { loading: true };
    case DELETE_MEMBER_SUCCESS:
      return { loading: false, success: true, member: action.payload };
    case DELETE_MEMBER_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_MEMBER_RESET:
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
