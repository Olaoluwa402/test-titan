import axios from "axios";
import {
  GET_HOMEDATA_REQUEST,
  GET_HOMEDATA_SUCCESS,
  GET_HOMEDATA_FAIL,
  GET_CLUBPLAN_REQUEST,
  GET_CLUBPLAN_SUCCESS,
  GET_CLUBPLAN_FAIL,
  CLEAR_ERRORS,
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
