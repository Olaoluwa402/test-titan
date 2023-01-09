import axios from "axios";
import {
  GET_CLUBPLANS_REQUEST,
  GET_CLUBPLANS_SUCCESS,
  GET_CLUBPLANS_FAIL,
  GET_CLUBPLANDETAIL_REQUEST,
  GET_CLUBPLANDETAIL_SUCCESS,
  GET_CLUBPLANDETAIL_FAIL,
  CREATE_CLUBPLAN_REQUEST,
  CREATE_CLUBPLAN_SUCCESS,
  CREATE_CLUBPLAN_FAIL,
  DELETE_CLUBPLAN_REQUEST,
  DELETE_CLUBPLAN_SUCCESS,
  DELETE_CLUBPLAN_FAIL,
  UPDATE_CLUBPLAN_REQUEST,
  UPDATE_CLUBPLAN_SUCCESS,
  UPDATE_CLUBPLAN_FAIL,
  CLEAR_ERRORS,
} from "../constants/clubPlanConstants";

import { toast } from "react-toastify";
import { logout } from "./userActions";

const API_URL = "http://localhost:8000";
//const API_URL = "http://164.92.84.16";

// register
export const createclubPlanAction =
  ({ title, price, short_desc, long_desc }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_CLUBPLAN_REQUEST,
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
        `${API_URL}/api/club_plans`,
        { title, price, short_desc, long_desc },
        config
      );

      if (data) {
        dispatch({
          type: CREATE_CLUBPLAN_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: CREATE_CLUBPLAN_FAIL,
        payload: message,
      });

      toast(`${message}`);
    }
  };

export const updateClubPlanAction =
  ({ id, title, price, short_desc, long_desc }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: UPDATE_CLUBPLAN_REQUEST,
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
        `${API_URL}/api/club_plans/${id}`,
        { title, price, short_desc, long_desc },
        config
      );

      if (data) {
        dispatch({
          type: UPDATE_CLUBPLAN_SUCCESS,
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
        type: UPDATE_CLUBPLAN_FAIL,
        payload: message,
      });

      toast.warning(`${message}`, { type: "warning" });
    }
  };

export const getclubPlansAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_CLUBPLANS_REQUEST,
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

    const { data } = await axios.get(`${API_URL}/api/club_plans`, config);

    if (data) {
      dispatch({
        type: GET_CLUBPLANS_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: GET_CLUBPLANS_FAIL,
      payload: message,
    });

    toast(`${message}`);
  }
};

export const getClubPlanDetailAction =
  ({ id }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_CLUBPLANDETAIL_REQUEST,
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
          type: GET_CLUBPLANDETAIL_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: GET_CLUBPLANDETAIL_FAIL,
        payload: message,
      });

      toast(`${message}`);
    }
  };

export const deleteClubPlanAction =
  ({ id }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: DELETE_CLUBPLAN_REQUEST,
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
        `${API_URL}/api/club_plans/${id}`,
        config
      );

      if (data) {
        dispatch({
          type: DELETE_CLUBPLAN_SUCCESS,
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
        type: DELETE_CLUBPLAN_FAIL,
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
