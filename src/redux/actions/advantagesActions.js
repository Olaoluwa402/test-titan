import axios from "axios";
import {
  GET_ADVANTAGES_REQUEST,
  GET_ADVANTAGES_SUCCESS,
  GET_ADVANTAGES_FAIL,
  GET_ADVANTAGEDETAIL_REQUEST,
  GET_ADVANTAGEDETAIL_SUCCESS,
  GET_ADVANTAGEDETAIL_FAIL,
  CREATE_ADVANTAGE_REQUEST,
  CREATE_ADVANTAGE_SUCCESS,
  CREATE_ADVANTAGE_FAIL,
  DELETE_ADVANTAGE_REQUEST,
  DELETE_ADVANTAGE_SUCCESS,
  DELETE_ADVANTAGE_FAIL,
  UPDATE_ADVANTAGE_REQUEST,
  UPDATE_ADVANTAGE_SUCCESS,
  UPDATE_ADVANTAGE_FAIL,
  CLEAR_ERRORS,
} from "../constants/advantageConstants.js";

import { toast } from "react-toastify";
import { logout } from "./userActions";

const API_URL = "http://localhost:8000";
//const API_URL = "http://164.92.84.16";

// register
export const createAdvantageAction =
  (formData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_ADVANTAGE_REQUEST,
      });
      //get logged in user token
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${userInfo.token}`,
        },
        credentials: "include",
        mode: "cors",
      };
      console.log(formData);
      const { data } = await axios.post(
        `${API_URL}/api/property_added_advantage`,
        formData,
        config
      );

      if (data) {
        dispatch({
          type: CREATE_ADVANTAGE_SUCCESS,
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
        type: CREATE_ADVANTAGE_FAIL,
        payload: message,
      });

      toast.warning(`${message}`, { type: "warning" });
    }
  };

export const updateAdvantageAction =
  (formData, id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: UPDATE_ADVANTAGE_REQUEST,
      });
      //get logged in user token
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${userInfo.token}`,
        },
        credentials: "include",
        mode: "cors",
      };

      const { data } = await axios.put(
        `${API_URL}/api/property_added_advantage/${id}`,
        formData,
        config
      );

      if (data) {
        dispatch({
          type: UPDATE_ADVANTAGE_SUCCESS,
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
        type: UPDATE_ADVANTAGE_FAIL,
        payload: message,
      });

      toast.warning(`${message}`, { type: "warning" });
    }
  };

export const getAdvantagesAction = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ADVANTAGES_REQUEST,
    });
    // headers:{
    //   Content-Type:'multipart/form-data'
    // }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/property_added_advantage`,
      {},
      config
    );
    console.log(data);

    if (data) {
      dispatch({
        type: GET_ADVANTAGES_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: GET_ADVANTAGES_FAIL,
      payload: message,
    });

    toast(`${message}`);
  }
};

export const getAdvantageDetailAction =
  ({ id }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_ADVANTAGEDETAIL_REQUEST,
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
        `${API_URL}/api/property_added_advantage/${id}`,
        config
      );
      console.log(data);

      if (data) {
        dispatch({
          type: GET_ADVANTAGEDETAIL_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: GET_ADVANTAGEDETAIL_FAIL,
        payload: message,
      });

      toast(`${message}`);
    }
  };

export const deleteAdvantageAction =
  ({ id }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: DELETE_ADVANTAGE_REQUEST,
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
        `${API_URL}/api/property_added_advantage/${id}`,
        config
      );

      if (data) {
        dispatch({
          type: DELETE_ADVANTAGE_SUCCESS,
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
        type: DELETE_ADVANTAGE_FAIL,
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
