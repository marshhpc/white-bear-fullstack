import actions from "../actions";

export default function creatableCard(creatableCard = {}, action) {
   switch (action.type) {
      case actions.UPDATE_CREATABLE_CARD:
         return action.payload; // put it in the redux store
      default:
         return creatableCard;
   }
}
