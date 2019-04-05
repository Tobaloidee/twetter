// Imports
import { combineReducers } from "redux";

// Reducers
import errorReducer from "./errorReducer";

export default combineReducers({
  errors: errorReducer
});
