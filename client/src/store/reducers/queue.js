import actions from "../actions";

export default function queue(queue = {}, action) {
   let newQueue = { ...queue };
   switch (action.type) {
      case actions.INCREMENT_QUEUE_INDEX:
         newQueue.index += 1;
         return newQueue;
      case actions.DECREMENT_QUEUE_INDEX:
         newQueue.index -= 1;
         return newQueue;
      case actions.RESET_QUEUE:
         newQueue.cards = [];
         newQueue.index = 0;
         return newQueue;
      case actions.UPDATE_QUEUED_CARD:
         newQueue.cards = action.payload;
         return newQueue; // new state
      default:
         return queue;
   }
}
