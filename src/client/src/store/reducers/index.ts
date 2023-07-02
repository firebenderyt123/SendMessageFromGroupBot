import { combineReducers } from "redux";
import { default as mailingListReducer } from "./mailingList";

const rootReducer = combineReducers({
  mailingList: mailingListReducer,
});

export default rootReducer;
