import axios from "axios";
import {
  GET_PROPERTIES_REQUEST,
  GET_PROPERTIES_SUCCESS,
  GET_PROPERTIES_FAIL,
  GET_PROPERTYDETAIL_REQUEST,
  GET_PROPERTYDETAIL_SUCCESS,
  GET_PROPERTYDETAIL_FAIL,
  CLEAR_ERRORS,
} from "../constants/propertiesConstants";

import { toast } from "react-toastify";

//const API_URL = "http://localhost:8000";
const API_URL = "http://164.92.84.16";
export const getPropertiesAction = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_PROPERTIES_REQUEST,
    });

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
  async (dispatch) => {
    try {
      dispatch({
        type: GET_PROPERTYDETAIL_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
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
