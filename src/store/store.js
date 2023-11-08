// store.js
import { createStore } from 'redux';

// Define the initial state
const initialState = {
  champions: {},
};

// Define the reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CHAMPIONS':
      return {
        ...state,
        champions: action.payload,
      };
    default:
      return state;
  }
};

// Create the Redux store
const store = createStore(reducer);

export default store;
