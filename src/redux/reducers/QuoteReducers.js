import {
  GET_QUOTES_REQUEST,
  GET_QUOTES_SUCCESS,
  GET_QUOTES_FAIL,
  GET_QUOTEDETAIL_REQUEST,
  GET_QUOTEDETAIL_SUCCESS,
  GET_QUOTEDETAIL_FAIL,
  CLEAR_ERRORS,
  CREATE_QUOTE_REQUEST,
  CREATE_QUOTE_SUCCESS,
  CREATE_QUOTE_RESET,
  CREATE_QUOTE_FAIL,
  UPDATE_QUOTE_REQUEST,
  UPDATE_QUOTE_SUCCESS,
  UPDATE_QUOTE_RESET,
  UPDATE_QUOTE_FAIL,
  DELETE_QUOTE_REQUEST,
  DELETE_QUOTE_SUCCESS,
  DELETE_QUOTE_RESET,
  DELETE_QUOTE_FAIL,
} from "../constants/QuoteConstants";

export const createQuoteReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_QUOTE_REQUEST:
      return { loading: true };
    case CREATE_QUOTE_SUCCESS:
      return { loading: false, success: true, quote: action.payload };
    case CREATE_QUOTE_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_QUOTE_RESET:
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

export const updateQuoteReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_QUOTE_REQUEST:
      return { loading: true };
    case UPDATE_QUOTE_SUCCESS:
      return { loading: false, success: true, quote: action.payload };
    case UPDATE_QUOTE_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_QUOTE_RESET:
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

export const openQuoteReducer = (state = { open: false }, action) => {
  switch (action.type) {
    case "CLOSE":
      return { open: false };
    case "OPEN":
      return { open: true };
    default:
      return state;
  }
};

export const getQuotesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_QUOTES_REQUEST:
      return { loading: true };
    case GET_QUOTES_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_QUOTES_FAIL:
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

export const getQuoteDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_QUOTEDETAIL_REQUEST:
      return { loading: true };
    case GET_QUOTEDETAIL_SUCCESS:
      return { loading: false, quote: action.payload };
    case GET_QUOTEDETAIL_FAIL:
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

export const deleteQuoteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_QUOTE_REQUEST:
      return { loading: true };
    case DELETE_QUOTE_SUCCESS:
      return { loading: false, success: true, quote: action.payload };
    case DELETE_QUOTE_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_QUOTE_RESET:
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
