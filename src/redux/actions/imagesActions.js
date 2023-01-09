import axios from "axios";
import {
  GET_IMAGES_REQUEST,
  GET_IMAGES_SUCCESS,
  GET_IMAGES_FAIL,
  GET_IMAGEDETAIL_REQUEST,
  GET_IMAGEDETAIL_SUCCESS,
  GET_IMAGEDETAIL_FAIL,
  CREATE_IMAGE_REQUEST,
  CREATE_IMAGE_SUCCESS,
  CREATE_IMAGE_FAIL,
  DELETE_IMAGE_REQUEST,
  DELETE_IMAGE_SUCCESS,
  DELETE_IMAGE_FAIL,
  UPDATE_IMAGE_REQUEST,
  UPDATE_IMAGE_SUCCESS,
  UPDATE_IMAGE_FAIL,
  CLEAR_ERRORS,
} from "../constants/imagesConstants";

import { toast } from "react-toastify";
import { logout } from "./userActions";

const API_URL = "http://localhost:8000";
//const API_URL = "http://164.92.84.16";

// register
export const createImageAction = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_IMAGE_REQUEST,
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

    const { data } = await axios.post(
      `${API_URL}/api/property_images`,
      formData,
      config
    );

    if (data) {
      dispatch({
        type: CREATE_IMAGE_SUCCESS,
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
      type: CREATE_IMAGE_FAIL,
      payload: message,
    });

    toast.warning(`${message}`, { type: "warning" });
  }
};

export const updateImageAction =
  (formData, id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: UPDATE_IMAGE_REQUEST,
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
        `${API_URL}/api/property_images/${id}`,
        formData,
        config
      );

      if (data) {
        dispatch({
          type: UPDATE_IMAGE_SUCCESS,
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
        type: UPDATE_IMAGE_FAIL,
        payload: message,
      });

      toast.warning(`${message}`, { type: "warning" });
    }
  };

export const getImagesAction = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_IMAGES_REQUEST,
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
      `${API_URL}/api/property_images`,
      {},
      config
    );
    console.log(data);

    if (data) {
      dispatch({
        type: GET_IMAGES_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: GET_IMAGES_FAIL,
      payload: message,
    });

    toast(`${message}`);
  }
};

export const getImageDetailAction =
  ({ id }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_IMAGEDETAIL_REQUEST,
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
        `${API_URL}/api/property_images/${id}`,
        config
      );
      console.log(data);

      if (data) {
        dispatch({
          type: GET_IMAGEDETAIL_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: GET_IMAGEDETAIL_FAIL,
        payload: message,
      });

      toast(`${message}`);
    }
  };

export const deleteImageAction =
  ({ id }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: DELETE_IMAGE_REQUEST,
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
        `${API_URL}/api/property_images/${id}`,
        config
      );

      if (data) {
        dispatch({
          type: DELETE_IMAGE_SUCCESS,
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
        type: DELETE_IMAGE_FAIL,
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
