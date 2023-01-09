import axios from "axios";
import {
  GET_PLANBENEFITS_REQUEST,
  GET_PLANBENEFITS_SUCCESS,
  GET_PLANBENEFITS_FAIL,
  GET_PLANBENEFITDETAIL_REQUEST,
  GET_PLANBENEFITDETAIL_SUCCESS,
  GET_PLANBENEFITDETAIL_FAIL,
  CLEAR_ERRORS,
  CREATE_PLANBENEFIT_REQUEST,
  CREATE_PLANBENEFIT_SUCCESS,
  CREATE_PLANBENEFIT_FAIL,
  UPDATE_PLANBENEFIT_REQUEST,
  UPDATE_PLANBENEFIT_SUCCESS,
  UPDATE_PLANBENEFIT_FAIL,
  DELETE_PLANBENEFIT_REQUEST,
  DELETE_PLANBENEFIT_SUCCESS,
  DELETE_PLANBENEFIT_FAIL,
} from "../constants/planBenefitConstants";

import { toast } from "react-toastify";
import { logout } from "./userActions";

const API_URL = "http://localhost:8000";
//const API_URL = "http://164.92.84.16";

// register
export const createPlanBenefitAction =
  ({ benefit, clubPlanId }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_PLANBENEFIT_REQUEST,
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
        `${API_URL}/api/club_plan_benefits`,
        { benefit, clubPlanId },
        config
      );

      if (data) {
        dispatch({
          type: CREATE_PLANBENEFIT_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: CREATE_PLANBENEFIT_FAIL,
        payload: message,
      });

      toast(`${message}`);
    }
  };

export const updatePlanBenefitAction =
  ({ id, benefit, clubPlanId }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: UPDATE_PLANBENEFIT_REQUEST,
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
        `${API_URL}/api/club_plan_benefits/${id}`,
        { benefit, clubPlanId },
        config
      );

      if (data) {
        dispatch({
          type: UPDATE_PLANBENEFIT_SUCCESS,
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
        type: UPDATE_PLANBENEFIT_FAIL,
        payload: message,
      });

      toast.warning(`${message}`, { type: "warning" });
    }
  };

export const getPlanBenefitsAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_PLANBENEFITS_REQUEST,
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

    const { data } = await axios.get(
      `${API_URL}/api/club_plan_benefits`,
      config
    );

    if (data) {
      dispatch({
        type: GET_PLANBENEFITS_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: GET_PLANBENEFITS_FAIL,
      payload: message,
    });

    toast(`${message}`);
  }
};

export const getPlanBenefitDetailAction =
  ({ id }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_PLANBENEFITDETAIL_REQUEST,
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
        `${API_URL}/api/club_plan_benefits/${id}`,
        config
      );
      console.log(data);

      if (data) {
        dispatch({
          type: GET_PLANBENEFITDETAIL_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: GET_PLANBENEFITDETAIL_FAIL,
        payload: message,
      });

      toast(`${message}`);
    }
  };

export const deletePlanBenefitAction =
  ({ id }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: DELETE_PLANBENEFIT_REQUEST,
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
        `${API_URL}/api/club_plan_benefits/${id}`,
        config
      );

      if (data) {
        dispatch({
          type: DELETE_PLANBENEFIT_SUCCESS,
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
        type: DELETE_PLANBENEFIT_FAIL,
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
