import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_MAILNOT_VERIFIED,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  CLEAR_ERRORS,
} from "../constants/userConstants";

import { toast } from "react-toastify";

// const API_URL = "http://localhost:8000";
const API_URL = "http://164.92.84.16";

export const loginUser = () => async (dispatch) => {};

export const registerUser = () => async (dispatch) => {};
