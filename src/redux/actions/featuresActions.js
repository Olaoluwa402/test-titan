import axios from "axios";
import {
  GET_FEATURES_REQUEST,
  GET_FEATURES_SUCCESS,
  GET_FEATURES_FAIL,
  GET_FEATUREDETAIL_REQUEST,
  GET_FEATUREDETAIL_SUCCESS,
  GET_FEATUREDETAIL_FAIL,
  CREATE_FEATURE_REQUEST,
  CREATE_FEATURE_SUCCESS,
  CREATE_FEATURE_FAIL,
  DELETE_FEATURE_REQUEST,
  DELETE_FEATURE_SUCCESS,
  DELETE_FEATURE_FAIL,
  UPDATE_FEATURE_REQUEST,
  UPDATE_FEATURE_SUCCESS,
  UPDATE_FEATURE_FAIL,
  CLEAR_ERRORS,
} from "../constants/featureConstants";

import { toast } from "react-toastify";
import { logout } from "./userActions";

const API_URL = "http://localhost:8000";
//const API_URL = "http://164.92.84.16";

// register
export const createFeatureAction = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_FEATURE_REQUEST,
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
      `${API_URL}/api/property_features`,
      formData,
      config
    );

    console.log(data, "FACILTY");

    if (data) {
      dispatch({
        type: CREATE_FEATURE_SUCCESS,
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
      type: CREATE_FEATURE_FAIL,
      payload: message,
    });

    toast.warning(`${message}`, { type: "warning" });
  }
};

export const updateFeatureAction =
  (formData, id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: UPDATE_FEATURE_REQUEST,
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
        `${API_URL}/api/property_features/${id}`,
        formData,
        config
      );

      console.log(data, "FEATURE");

      if (data) {
        dispatch({
          type: UPDATE_FEATURE_SUCCESS,
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
        type: UPDATE_FEATURE_FAIL,
        payload: message,
      });

      toast.warning(`${message}`, { type: "warning" });
    }
  };

export const getFeaturesAction = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_FEATURES_REQUEST,
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
      `${API_URL}/api/property_features`,
      {},
      config
    );
    console.log(data);

    if (data) {
      dispatch({
        type: GET_FEATURES_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: GET_FEATURES_FAIL,
      payload: message,
    });

    toast(`${message}`);
  }
};

export const getFeatureDetailAction =
  ({ id }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_FEATUREDETAIL_REQUEST,
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
        `${API_URL}/api/property_features/${id}`,
        config
      );
      console.log(data);

      if (data) {
        dispatch({
          type: GET_FEATUREDETAIL_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: GET_FEATUREDETAIL_FAIL,
        payload: message,
      });

      toast(`${message}`);
    }
  };

export const deleteFeatureAction =
  ({ id }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: DELETE_FEATURE_REQUEST,
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
        `${API_URL}/api/property_features/${id}`,
        config
      );

      if (data) {
        dispatch({
          type: DELETE_FEATURE_SUCCESS,
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
        type: DELETE_FEATURE_FAIL,
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
