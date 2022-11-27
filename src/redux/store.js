import { createStore, applyMiddleware } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
import reducers from "./reducers/reducers";

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const initialState = {
  userLogin: {},
};

const masterReducer = (state, action) => {
  // hydration is a process of filling an object with some data
  // this is called when server side request happens
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    if (state.homeData) nextState.homeData = state.homeData;
    if (state.clubPlans) nextState.clubPlans = state.clubPlans; // preserve count value on client side navigation
    return nextState;
  } else {
    // whenever we deal with static rendering or client side rendering, this will be the case
    // reducers is the combinedReducers
    return reducers(state, action);
  }
  // if (action.type === HYDRATE) {
  //   const nextState = {
  //     ...state,
  //     ...action.payload,
  //   };
  //   return nextState;
  //   // const clientState = { ...state };
  //   // const serverState = { ...action.payload };
  //   // const nextState = { ...clientState, ...serverState };

  //   // const nextState = {
  //   //   ...state,
  //   //   users:{
  //   //     users:[...new Set([...action.payload.users.users, ...state.users.users])]
  //   //   }
  //   // }

  //   // if (state) {
  //   //   nextState.userLogin = initialState.userLogin;
  //   // }
  //   // Result, blank page.
  //   // return nextState;
  // } else {
  //   return reducers(state, action);
  // }
};

// create a makeStore function
const makeStore = (context) =>
  createStore(masterReducer, bindMiddleware([thunkMiddleware]));

// export an assembled wrapper

export const wrapper = createWrapper(makeStore);
