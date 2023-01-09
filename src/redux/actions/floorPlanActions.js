import axios from "axios";
import {
  GET_FLOORPLANS_REQUEST,
  GET_FLOORPLANS_SUCCESS,
  GET_FLOORPLANS_FAIL,
  GET_FLOORPLANDETAIL_REQUEST,
  GET_FLOORPLANDETAIL_SUCCESS,
  GET_FLOORPLANDETAIL_FAIL,
  CREATE_FLOORPLAN_REQUEST,
  CREATE_FLOORPLAN_SUCCESS,
  CREATE_FLOORPLAN_FAIL,
  DELETE_FLOORPLAN_REQUEST,
  DELETE_FLOORPLAN_SUCCESS,
  DELETE_FLOORPLAN_FAIL,
  UPDATE_FLOORPLAN_REQUEST,
  UPDATE_FLOORPLAN_SUCCESS,
  UPDATE_FLOORPLAN_FAIL,
  CLEAR_ERRORS,
} from "../constants/floorPlanConstants";

import { toast } from "react-toastify";
import { logout } from "./userActions";

const API_URL = "http://localhost:8000";
//const API_URL = "http://164.92.84.16";

// register
export const createFloorPlanAction =
  (formData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_FLOORPLAN_REQUEST,
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
        `${API_URL}/api/property_plans`,
        formData,
        config
      );

      if (data) {
        dispatch({
          type: CREATE_FLOORPLAN_SUCCESS,
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
        type: CREATE_FLOORPLAN_FAIL,
        payload: message,
      });

      toast.warning(`${message}`, { type: "warning" });
    }
  };

export const updateFloorPlanAction =
  (formData, id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: UPDATE_FLOORPLAN_REQUEST,
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
        `${API_URL}/api/property_plans/${id}`,
        formData,
        config
      );

      if (data) {
        dispatch({
          type: UPDATE_FLOORPLAN_SUCCESS,
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
        type: UPDATE_FLOORPLAN_FAIL,
        payload: message,
      });

      toast.warning(`${message}`, { type: "warning" });
    }
  };

export const getFloorPlansAction = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_FLOORPLANS_REQUEST,
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
      `${API_URL}/api/property_plans`,
      {},
      config
    );
    console.log(data);

    if (data) {
      dispatch({
        type: GET_FLOORPLANS_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: GET_FLOORPLANS_FAIL,
      payload: message,
    });

    toast(`${message}`);
  }
};

export const getFloorPlanDetailAction =
  ({ id }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_FLOORPLANDETAIL_REQUEST,
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
        `${API_URL}/api/property_plans/${id}`,
        config
      );
      console.log(data);

      if (data) {
        dispatch({
          type: GET_FLOORPLANDETAIL_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: GET_FLOORPLANDETAIL_FAIL,
        payload: message,
      });

      toast(`${message}`);
    }
  };

export const deleteFloorPlanAction =
  ({ id }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: DELETE_FLOORPLAN_REQUEST,
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
        `${API_URL}/api/property_plans/${id}`,
        config
      );

      if (data) {
        dispatch({
          type: DELETE_FLOORPLAN_SUCCESS,
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
        type: DELETE_FLOORPLAN_FAIL,
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
