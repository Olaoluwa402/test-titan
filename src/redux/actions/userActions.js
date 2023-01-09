import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  CLEAR_ERRORS,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  GET_USERDETAIL_REQUEST,
  GET_USERDETAIL_SUCCESS,
  GET_USERDETAIL_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
} from "../constants/userConstants";

import { toast } from "react-toastify";

const API_URL = "http://localhost:8000";
//const API_URL = "http://164.92.84.16";

// login
export const loginUserAction =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_LOGIN_REQUEST,
      });
      const config = {
        headers: {
          "Content-Type": "Application/json",
        },
        credentials: "include",
        mode: "cors",
      };

      const { data } = await axios.post(
        `${API_URL}/api/users/login`,
        { email, password },
        config
      );

      if (data) {
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: data,
        });
        // alert welcome msg

        localStorage.setItem("userInfo", JSON.stringify(data));
      }
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: USER_LOGIN_FAIL,
        payload: message,
      });

      toast.warning(`${message}`, { type: "warning" });
    }
  };

// register
export const registerUserAction =
  ({ email, password, role }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });
      const config = {
        headers: {
          "Content-Type": "Application/json",
        },
        credentials: "include",
        mode: "cors",
      };

      const { data } = await axios.post(
        `${API_URL}/api/users/register`,
        { email, password, role },
        config
      );

      console.log(data, "register");

      if (data) {
        dispatch({
          type: USER_REGISTER_SUCCESS,
          payload: data,
        });
        // alert welcome msg
      }
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: USER_REGISTER_FAIL,
        payload: message,
      });

      toast.warning(`${message}`, { type: "warning" });
    }
  };

// logout
export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });

  toast.success(`Succefully logged out`, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export const updateUserAction =
  ({ id, password, role, previousPassword }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: UPDATE_USER_REQUEST,
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
        `${API_URL}/api/users/${id}`,
        { password, role, previousPassword },
        config
      );

      if (data) {
        dispatch({
          type: UPDATE_USER_SUCCESS,
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
        type: UPDATE_USER_FAIL,
        payload: message,
      });

      toast.warning(`${message}`, { type: "warning" });
    }
  };

export const getUsersAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_USERS_REQUEST,
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

    const { data } = await axios.get(`${API_URL}/api/users`, config);

    if (data) {
      dispatch({
        type: GET_USERS_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: GET_USERS_FAIL,
      payload: message,
    });

    toast(`${message}`);
  }
};

export const getUserDetailAction =
  ({ id }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_USERDETAIL_REQUEST,
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

      const { data } = await axios.get(`${API_URL}/api/users/${id}`, config);
      console.log(data);

      if (data) {
        dispatch({
          type: GET_USERDETAIL_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: GET_USERDETAIL_FAIL,
        payload: message,
      });

      toast(`${message}`);
    }
  };

export const deleteUserAction =
  ({ id }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: DELETE_USER_REQUEST,
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

      const { data } = await axios.delete(`${API_URL}/api/users/${id}`, config);

      if (data) {
        dispatch({
          type: DELETE_USER_SUCCESS,
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
        type: DELETE_USER_FAIL,
        payload: message,
      });

      toast(`${message}`);
    }
  };
