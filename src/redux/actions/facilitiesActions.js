import axios from "axios";
import {
  GET_FACILITIES_REQUEST,
  GET_FACILITIES_SUCCESS,
  GET_FACILITIES_FAIL,
  GET_FACILITYDETAIL_REQUEST,
  GET_FACILITYDETAIL_SUCCESS,
  GET_FACILITYDETAIL_FAIL,
  CREATE_FACILITY_REQUEST,
  CREATE_FACILITY_SUCCESS,
  CREATE_FACILITY_FAIL,
  DELETE_FACILITY_REQUEST,
  DELETE_FACILITY_SUCCESS,
  DELETE_FACILITY_FAIL,
  UPDATE_FACILITY_REQUEST,
  UPDATE_FACILITY_SUCCESS,
  UPDATE_FACILITY_FAIL,
  CLEAR_ERRORS,
} from "../constants/facilityConstants";

import { toast } from "react-toastify";
import { logout } from "./userActions";

const API_URL = "http://localhost:8000";
//const API_URL = "http://164.92.84.16";

// register
export const createFacilityAction =
  (formData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_FACILITY_REQUEST,
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
        `${API_URL}/api/facilities`,
        formData,
        config
      );

      console.log(data, "FACILTY");

      if (data) {
        dispatch({
          type: CREATE_FACILITY_SUCCESS,
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
        type: CREATE_FACILITY_FAIL,
        payload: message,
      });

      toast.warning(`${message}`, { type: "warning" });
    }
  };

export const updateFacilityAction =
  (formData, id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: UPDATE_FACILITY_REQUEST,
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
        `${API_URL}/api/facilities/${id}`,
        formData,
        config
      );

      console.log(data, "FACILITY");

      if (data) {
        dispatch({
          type: UPDATE_FACILITY_SUCCESS,
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
        type: UPDATE_FACILITY_FAIL,
        payload: message,
      });

      toast.warning(`${message}`, { type: "warning" });
    }
  };

export const getFacilitiesAction = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_FACILITIES_REQUEST,
    });
    // headers:{
    //   Content-Type:'multipart/form-data'
    // }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(`${API_URL}/api/facilities`, {}, config);
    console.log(data);

    if (data) {
      dispatch({
        type: GET_FACILITIES_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: GET_FACILITIES_FAIL,
      payload: message,
    });

    toast(`${message}`);
  }
};

export const getFacilityDetailAction =
  ({ id }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_FACILITYDETAIL_REQUEST,
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
        `${API_URL}/api/facilities/${id}`,
        config
      );
      console.log(data);

      if (data) {
        dispatch({
          type: GET_FACILITYDETAIL_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: GET_FACILITYDETAIL_FAIL,
        payload: message,
      });

      toast(`${message}`);
    }
  };

export const deleteFacilityAction =
  ({ id }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: DELETE_FACILITY_REQUEST,
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
        `${API_URL}/api/facilities/${id}`,
        config
      );

      if (data) {
        dispatch({
          type: DELETE_FACILITY_SUCCESS,
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
        type: DELETE_FACILITY_FAIL,
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
