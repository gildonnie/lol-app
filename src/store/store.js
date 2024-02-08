// store.js
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// Define the initial state
const initialState = {
  champions: {},
  version: null,
};

// Define the reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CHAMPIONS':
      return {
        ...state,
        champions: action.payload,
      };
    case 'SET_VERSION':
      return {
        ...state,
        version: action.payload,
      };
    default:
      return state;
  }
};

// Configure persist reducer
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

// Create the Redux store
const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
