import axios from "axios";
import {
  GET_PROPERTIES_REQUEST,
  GET_PROPERTIES_SUCCESS,
  GET_PROPERTIES_FAIL,
  GET_PROPERTYDETAIL_REQUEST,
  GET_PROPERTYDETAIL_SUCCESS,
  GET_PROPERTYDETAIL_FAIL,
  CREATE_PROPERTY_REQUEST,
  CREATE_PROPERTY_SUCCESS,
  CREATE_PROPERTY_FAIL,
  DELETE_PROPERTY_REQUEST,
  DELETE_PROPERTY_SUCCESS,
  DELETE_PROPERTY_FAIL,
  UPDATE_PROPERTY_REQUEST,
  UPDATE_PROPERTY_SUCCESS,
  UPDATE_PROPERTY_FAIL,
  CLEAR_ERRORS,
} from "../constants/propertiesConstants";

import { toast } from "react-toastify";
import { logout } from "./userActions";

const API_URL = "http://localhost:8000";
//const API_URL = "http://164.92.84.16";

// register
export const createPropertyAction =
  (formData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_PROPERTY_REQUEST,
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
        `${API_URL}/api/properties`,
        formData,
        config
      );

      console.log(data, "property");

      if (data) {
        dispatch({
          type: CREATE_PROPERTY_SUCCESS,
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
        type: CREATE_PROPERTY_FAIL,
        payload: message,
      });

      toast.warning(`${message}`, { type: "warning" });
    }
  };

export const updatePropertyAction =
  (formData, id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: UPDATE_PROPERTY_REQUEST,
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
        `${API_URL}/api/properties/${id}`,
        formData,
        config
      );

      console.log(data, "property");

      if (data) {
        dispatch({
          type: UPDATE_PROPERTY_SUCCESS,
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
        type: UPDATE_PROPERTY_FAIL,
        payload: message,
      });

      toast.warning(`${message}`, { type: "warning" });
    }
  };

export const getPropertiesAction = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_PROPERTIES_REQUEST,
    });
    // headers:{
    //   Content-Type:'multipart/form-data'
    // }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(`${API_URL}/api/properties`, {}, config);
    console.log(data);

    if (data) {
      dispatch({
        type: GET_PROPERTIES_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: GET_PROPERTIES_FAIL,
      payload: message,
    });

    toast(`${message}`);
  }
};

export const getPropertyDetailAction =
  ({ id }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_PROPERTYDETAIL_REQUEST,
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
        `${API_URL}/api/properties/${id}`,
        {},
        config
      );
      console.log(data);

      if (data) {
        dispatch({
          type: GET_PROPERTYDETAIL_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: GET_PROPERTYDETAIL_FAIL,
        payload: message,
      });

      toast(`${message}`);
    }
  };

export const deletePropertyAction =
  ({ id }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: DELETE_PROPERTY_REQUEST,
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
        `${API_URL}/api/properties/${id}`,
        config
      );

      if (data) {
        dispatch({
          type: DELETE_PROPERTY_SUCCESS,
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
        type: DELETE_PROPERTY_FAIL,
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
