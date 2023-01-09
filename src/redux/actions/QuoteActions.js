import axios from "axios";
import {
  GET_QUOTES_REQUEST,
  GET_QUOTES_SUCCESS,
  GET_QUOTES_FAIL,
  GET_QUOTEDETAIL_REQUEST,
  GET_QUOTEDETAIL_SUCCESS,
  GET_QUOTEDETAIL_FAIL,
  CREATE_QUOTE_REQUEST,
  CREATE_QUOTE_SUCCESS,
  CREATE_QUOTE_FAIL,
  DELETE_QUOTE_REQUEST,
  DELETE_QUOTE_SUCCESS,
  DELETE_QUOTE_FAIL,
  UPDATE_QUOTE_REQUEST,
  UPDATE_QUOTE_SUCCESS,
  UPDATE_QUOTE_FAIL,
  CLEAR_ERRORS,
} from "../constants/QuoteConstants";

import { toast } from "react-toastify";
import { logout } from "./userActions";

const API_URL = "http://localhost:8000";
//const API_URL = "http://164.92.84.16";

// register
export const createQuoteAction =
  ({ title, email, phone, fullName, agreement }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_QUOTE_REQUEST,
      });

      //get logged in user token
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "Application/json",
          authorization: `Bearer ${userInfo.token}`,
        },
        credentials: "include",
        mode: "cors",
      };

      const { data } = await axios.post(
        `${API_URL}/api/quotations`,
        { title, email, phone, fullName, agreement },
        config
      );

      if (data) {
        dispatch({
          type: CREATE_QUOTE_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: CREATE_QUOTE_FAIL,
        payload: message,
      });

      toast(`${message}`);
    }
  };

export const updateQuoteAction =
  ({ id, title, price, short_desc, long_desc }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: UPDATE_QUOTE_REQUEST,
      });
      //get logged in user token
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "Application/json",
          authorization: `Bearer ${userInfo.token}`,
        },
        credentials: "include",
        mode: "cors",
      };

      const { data } = await axios.put(
        `${API_URL}/api/quotes/${id}`,
        { title, price, short_desc, long_desc },
        config
      );

      if (data) {
        dispatch({
          type: UPDATE_QUOTE_SUCCESS,
          payload: data,
        });
        // alert welcome msg
      }
    } catch (err) {
      let message =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      if (message === "Invalid token, Not authorized!" || /jwt/.test(message)) {
        //dispatch logout
        dispatch(logout());
      }

      dispatch({
        type: UPDATE_QUOTE_FAIL,
        payload: message,
      });

      toast.warning(`${message}`, { type: "warning" });
    }
  };

export const getQuotesAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_QUOTES_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "Application/json",
        authorization: `Bearer ${userInfo.token}`,
      },
      credentials: "include",
      mode: "cors",
    };

    const { data } = await axios.get(`${API_URL}/api/quotations`, config);

    if (data) {
      dispatch({
        type: GET_QUOTES_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: GET_QUOTES_FAIL,
      payload: message,
    });

    toast(`${message}`);
  }
};

export const getQuoteDetailAction =
  ({ id }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_QUOTEDETAIL_REQUEST,
      });
      //get logged in user token
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userInfo.token}`,
        },
        credentials: "include",
        mode: "cors",
      };

      const { data } = await axios.get(
        `${API_URL}/api/club_plans/${id}`,
        config
      );
      console.log(data);

      if (data) {
        dispatch({
          type: GET_QUOTEDETAIL_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: GET_QUOTEDETAIL_FAIL,
        payload: message,
      });

      toast(`${message}`);
    }
  };

export const deleteQuoteAction =
  ({ id }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: DELETE_QUOTE_REQUEST,
      });
      //get logged in user token
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userInfo.token}`,
        },
        credentials: "include",
        mode: "cors",
      };

      const { data } = await axios.delete(
        `${API_URL}/api/quotations/${id}`,
        config
      );

      if (data) {
        dispatch({
          type: DELETE_QUOTE_SUCCESS,
          payload: data,
        });
      }
    } catch (err) {
      let message =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      if (message === "Invalid token, Not authorized!" || /jwt/.test(message)) {
        //dispatch logout
        dispatch(logout());
      }

      dispatch({
        type: DELETE_QUOTE_FAIL,
        payload: message,
      });

      toast(`${message}`);
    }
  };

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
