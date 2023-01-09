import axios from "axios";
import {
  GET_SETTING_REQUEST,
  GET_SETTING_SUCCESS,
  GET_SETTING_FAIL,
  CLEAR_ERRORS,
  CREATE_SETTING_REQUEST,
  CREATE_SETTING_SUCCESS,
  CREATE_SETTING_FAIL,
  UPDATE_SETTING_REQUEST,
  UPDATE_SETTING_SUCCESS,
  UPDATE_SETTING_FAIL,
} from "../constants/settingConstants";

import { toast } from "react-toastify";
import { logout } from "./userActions";

const API_URL = "http://localhost:8000";
//const API_URL = "http://164.92.84.16";

// register
export const createSettingAction = (detail) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_SETTING_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${API_URL}/api/settings`,
      { detail },
      config
    );
    console.log(data);

    if (data) {
      dispatch({
        type: CREATE_SETTING_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: CREATE_SETTING_FAIL,
      payload: message,
    });

    toast(`${message}`);
  }
};

export const updateSettingAction =
  ({
    id,
    phone,
    email,
    getQuoteCTA,
    selectLocationPlaceholder,
    selectBedroomAmountPlaceholder,
    selectPropertyPlaceholder,
    selectPriceRangePlaceholder,
    company_address,
  }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: UPDATE_SETTING_REQUEST,
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
        `${API_URL}/api/settings/${id}`,
        {
          phone,
          email,
          getQuoteCTA,
          selectLocationPlaceholder,
          selectBedroomAmountPlaceholder,
          selectPropertyPlaceholder,
          selectPriceRangePlaceholder,
          company_address,
        },
        config
      );

      if (data) {
        dispatch({
          type: UPDATE_SETTING_SUCCESS,
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
        type: UPDATE_SETTING_FAIL,
        payload: message,
      });

      toast.warning(`${message}`, { type: "warning" });
    }
  };

export const getSettingAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_SETTING_REQUEST,
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

    const { data } = await axios.get(`${API_URL}/api/settings`, config);

    if (data) {
      dispatch({
        type: GET_SETTING_SUCCESS,
        payload: data.settings[0],
      });
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: GET_SETTING_FAIL,
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
