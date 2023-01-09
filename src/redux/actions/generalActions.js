import axios from "axios";
import {
  GET_HOMEDATA_REQUEST,
  GET_HOMEDATA_SUCCESS,
  GET_HOMEDATA_FAIL,
  GET_CLUBPLAN_REQUEST,
  GET_CLUBPLAN_SUCCESS,
  GET_CLUBPLAN_FAIL,
  CLEAR_ERRORS,
  GET_ABOUT_REQUEST,
  GET_ABOUT_SUCCESS,
  GET_ABOUT_FAIL,
  UPDATE_ABOUT_REQUEST,
  UPDATE_ABOUT_SUCCESS,
  UPDATE_ABOUT_FAIL,
} from "../constants/generalConstants";

import { toast } from "react-toastify";

const API_URL = "http://localhost:8000";
//const API_URL = "http://164.92.84.16";

export const getHomeDataAction = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_HOMEDATA_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(`${API_URL}/api`, {}, config);
    console.log(data.data);

    if (data && data.data) {
      localStorage.setItem("homeData", JSON.stringify(data));
      dispatch({
        type: GET_HOMEDATA_SUCCESS,
        payload: data.data,
      });
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: GET_HOMEDATA_FAIL,
      payload: message,
    });

    toast(`${message}`);
  }
};

export const getClubPlanAction = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_CLUBPLAN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(`${API_URL}/api/club_plans`, {}, config);
    console.log(data);

    if (data) {
      dispatch({
        type: GET_CLUBPLAN_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: GET_CLUBPLAN_FAIL,
      payload: message,
    });

    toast(`${message}`);
  }
};

export const getAboutAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ABOUT_REQUEST,
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

    const { data } = await axios.get(`${API_URL}/api/about`, config);

    if (data) {
      dispatch({
        type: GET_ABOUT_SUCCESS,
        payload: data.abouts[0],
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
      type: GET_ABOUT_FAIL,
      payload: message,
    });

    toast(`${message}`);
  }
};

export const updateAboutAction =
  (formData, id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: UPDATE_ABOUT_REQUEST,
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

      const { data } = await axios.put(
        `${API_URL}/api/about/${id}`,
        formData,
        config
      );

      if (data) {
        dispatch({
          type: UPDATE_ABOUT_SUCCESS,
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
        type: UPDATE_ABOUT_FAIL,
        payload: message,
      });

      toast(`${message}`);
    }
  };
