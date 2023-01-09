import axios from "axios";
import {
  GET_MEMBERS_REQUEST,
  GET_MEMBERS_SUCCESS,
  GET_MEMBERS_FAIL,
  GET_MEMBERDETAIL_REQUEST,
  GET_MEMBERDETAIL_SUCCESS,
  GET_MEMBERDETAIL_FAIL,
  CREATE_MEMBER_REQUEST,
  CREATE_MEMBER_SUCCESS,
  CREATE_MEMBER_FAIL,
  DELETE_MEMBER_REQUEST,
  DELETE_MEMBER_SUCCESS,
  DELETE_MEMBER_FAIL,
  UPDATE_MEMBER_REQUEST,
  UPDATE_MEMBER_SUCCESS,
  UPDATE_MEMBER_FAIL,
  CLEAR_ERRORS,
} from "../constants/memberConstants";

import { toast } from "react-toastify";
import { logout } from "./userActions";

const API_URL = "http://localhost:8000";
//const API_URL = "http://164.92.84.16";

// register
export const createMemberAction = (detail) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_MEMBER_REQUEST,
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
        type: CREATE_MEMBER_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: CREATE_MEMBER_FAIL,
      payload: message,
    });

    toast(`${message}`);
  }
};

export const updateMemberAction = (detail) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_MEMBER_REQUEST,
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
      `${API_URL}/api/members/${id}`,
      { detail },
      config
    );

    console.log(data, "MEMBER");

    if (data) {
      dispatch({
        type: UPDATE_MEMBER_SUCCESS,
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
      type: UPDATE_MEMBER_FAIL,
      payload: message,
    });

    toast.warning(`${message}`, { type: "warning" });
  }
};

export const getMembersAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_MEMBERS_REQUEST,
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

    const { data } = await axios.get(`${API_URL}/api/members`, config);
    console.log(data);

    if (data) {
      dispatch({
        type: GET_MEMBERS_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: GET_MEMBERS_FAIL,
      payload: message,
    });

    toast(`${message}`);
  }
};

export const getMemberDetailAction =
  ({ id }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_MEMBERDETAIL_REQUEST,
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

      const { data } = await axios.get(`${API_URL}/api/members/${id}`, config);
      console.log(data);

      if (data) {
        dispatch({
          type: GET_MEMBERDETAIL_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: GET_MEMBERDETAIL_FAIL,
        payload: message,
      });

      toast(`${message}`);
    }
  };

export const deleteMemberAction =
  ({ id }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: DELETE_MEMBER_REQUEST,
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
        `${API_URL}/api/members/${id}`,
        config
      );

      if (data) {
        dispatch({
          type: DELETE_MEMBER_SUCCESS,
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
        type: DELETE_MEMBER_FAIL,
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
