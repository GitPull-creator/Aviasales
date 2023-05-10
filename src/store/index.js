import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from "redux";
import thunk from "redux-thunk";

import id from "../reducers/id";
import tickets from "../reducers/tickets";
import filter from "../reducers/filter";
import sort from "../reducers/sort";

const store = createStore(
  combineReducers({ id, tickets, filter, sort }),
  compose(applyMiddleware(thunk))
);

export default store;
