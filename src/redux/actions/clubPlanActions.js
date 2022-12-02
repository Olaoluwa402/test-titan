import axios from "axios";
import {
  REGISTERCLUBPLAN_FAIL,
  REGISTERCLUBPLAN_REQUEST,
  REGISTERCLUBPLAN_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/clubPlanConstants";

import { toast } from "react-toastify";

//  const API_URL = "http://localhost:8000";
const API_URL = "http://164.92.84.16";

export const registerClubPlanAction = (detail) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTERCLUBPLAN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${API_URL}/api/members`,
      { detail },
      config
    );
    console.log(data);

    if (data) {
      dispatch({
        type: REGISTERCLUBPLAN_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: REGISTERCLUBPLAN_FAIL,
      payload: message,
    });

    toast(`${message}`);
  }
};
