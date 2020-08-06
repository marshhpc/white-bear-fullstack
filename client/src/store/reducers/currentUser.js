import actions from "../actions";
import isEmpty from "lodash/isEmpty";
import axios from "axios";

export default function currentUser(currentUser = {}, action) {
   switch (action.type) {
      case actions.UPDATE_CURRENT_USER:
         if (isEmpty(action.payload)) {
            localStorage.removeItem("authToken");
            delete axios.defaults.headers.common["x-auth-token"];
         }
         return action.payload;
      default:
         return currentUser;
   }
}
