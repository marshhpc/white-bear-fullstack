import { combineReducers } from "redux";
import currentUser from "./reducers/currentUser";
import queue from "./reducers/queue";
import editableCard from "./reducers/editableCard";

export default combineReducers({
   currentUser,
   queue,
   editableCard,
});
