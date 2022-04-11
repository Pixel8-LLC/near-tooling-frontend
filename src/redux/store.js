import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducers from "./reducers";

const reducer = combineReducers({
  ...rootReducers,
});

const store = (initialState, context = {}) => {
  return {
    ...createStore(reducer, composeWithDevTools()),
  };
};
export default store;
