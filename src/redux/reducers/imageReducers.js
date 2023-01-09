import {
  GET_IMAGES_REQUEST,
  GET_IMAGES_SUCCESS,
  GET_IMAGES_FAIL,
  GET_IMAGEDETAIL_REQUEST,
  GET_IMAGEDETAIL_SUCCESS,
  GET_IMAGEDETAIL_FAIL,
  CLEAR_ERRORS,
  CREATE_IMAGE_REQUEST,
  CREATE_IMAGE_SUCCESS,
  CREATE_IMAGE_RESET,
  CREATE_IMAGE_FAIL,
  UPDATE_IMAGE_REQUEST,
  UPDATE_IMAGE_SUCCESS,
  UPDATE_IMAGE_RESET,
  UPDATE_IMAGE_FAIL,
  DELETE_IMAGE_REQUEST,
  DELETE_IMAGE_SUCCESS,
  DELETE_IMAGE_RESET,
  DELETE_IMAGE_FAIL,
} from "../constants/imagesConstants";

export const createImageReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_IMAGE_REQUEST:
      return { loading: true };
    case CREATE_IMAGE_SUCCESS:
      return { loading: false, success: true, image: action.payload };
    case CREATE_IMAGE_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_IMAGE_RESET:
      return {};
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const updateImageReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_IMAGE_REQUEST:
      return { loading: true };
    case UPDATE_IMAGE_SUCCESS:
      return { loading: false, success: true, image: action.payload };
    case UPDATE_IMAGE_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_IMAGE_RESET:
      return {};
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const getImagesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_IMAGES_REQUEST:
      return { loading: true };
    case GET_IMAGES_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_IMAGES_FAIL:
      return { loading: false, error: action.payload };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const getImageDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_IMAGEDETAIL_REQUEST:
      return { loading: true };
    case GET_IMAGEDETAIL_SUCCESS:
      return { loading: false, image: action.payload };
    case GET_IMAGEDETAIL_FAIL:
      return { loading: false, error: action.payload };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const deleteImageReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_IMAGE_REQUEST:
      return { loading: true };
    case DELETE_IMAGE_SUCCESS:
      return { loading: false, success: true, image: action.payload };
    case DELETE_IMAGE_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_IMAGE_RESET:
      return {};
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
