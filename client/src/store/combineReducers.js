import { combineReducers } from "redux";
import currentUser from "./reducers/currentUser";
import queue from "./reducers/queue";
import editableCard from "./reducers/editableCard";
import creatableCard from "./reducers/creatableCard";

export default combineReducers({
   currentUser,
   queue,
   editableCard,
   creatableCard,
});
