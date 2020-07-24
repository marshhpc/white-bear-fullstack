import React from "react";
import AppTemplate from "../ui/AppTemplate";

import { connect } from "react-redux";
import actions from "../../store/actions";

class ReviewEmpty extends React.Component {
   goToPrevCard() {
      this.props.dispatch({ type: actions.DECREMENT_QUEUE_INDEX });
      this.props.history.push("/review-answer");
   }

   getMoreCards() {
      this.props.dispatch({ type: actions.DECREMENT_QUEUE_INDEX });
      this.props.history.push("/review-imagery");
   }

   render() {
      return (
         <AppTemplate>
            <h4 className="d-flex justify-content-center text-muted">
               Out of cards
            </h4>

            <div>
               {this.props.queue.index > 0 && (
                  <button
                     className="btn bbutton"
                     onClick={() => {
                        this.goToPrevCard();
                     }}
                  >
                     Previous card
                  </button>
               )}
               <div className="float-right">
                  <button
                     className="btn btn-outline-primary ml-4 font-weight-bold"
                     onClick={() => {
                        this.getMoreCards();
                     }}
                  >
                     Get more cards
                  </button>
               </div>
            </div>
         </AppTemplate>
      );
   }
}
function mapStateToProps(state) {
   return {
      queue: state.queue,
   };
}
export default connect(mapStateToProps)(ReviewEmpty);
