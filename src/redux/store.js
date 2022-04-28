import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import rootReducers from "./reducers";

const reducer = combineReducers({
  ...rootReducers,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = (initialState, context = {}) => {
  let store = createStore(persistedReducer, composeWithDevTools());
  let persistor = persistStore(store);
  return { store, persistor };
  // return {
  //   ...createStore(persistedReducer, composeWithDevTools()),
  // };
};
export default store;
