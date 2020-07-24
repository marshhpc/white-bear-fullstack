import React from "react";
import AppTemplate from "../ui/AppTemplate";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import actions from "../../store/actions";
// import memoryCards from "../../moc-data/memory-cards";

// const memoryCard = memoryCards[0];

class ReviewImagery extends React.Component {
   constructor(props) {
      super(props);
      if (props.queue.cards.length === 0) {
         axios
            .get(
               "https://raw.githubusercontent.com/marshhpc/white-bear-mpa/master/src/moc-data/memory-cards.json"
            )
            .then(function (res) {
               // handle success
               console.log(res);
               props.dispatch({
                  type: actions.STORE_QUEUED_CARDS,
                  payload: res.data,
               });
            })
            .catch(function (error) {
               // handle error
               console.log(error);
            });

         /*

         queuedCards: [],
         indexOfCurrentCard: 0,
         currentUser: {},
          
         */
      }
      if (props.queue.index > props.queue.cards.length) {
         this.props.history.push("/review-empty");
      }
   }

   goToPrevCard() {
      this.props.dispatch({ type: actions.DECREMENT_QUEUE_INDEX });
      this.props.history.push("/review-answer");
   }

   render() {
      const memoryCard = this.props.queue.cards[this.props.queue.index];

      return (
         <AppTemplate>
            <div className="mb-5">
               <div className="card bg-primary">
                  <div className="card-body">
                     {memoryCard && memoryCard.imagery}
                  </div>
               </div>
            </div>
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
                  <Link
                     to="/review-answer"
                     className="btn btn-outline-primary ml-4 font-weight-bold"
                  >
                     Show answer
                  </Link>
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
export default connect(mapStateToProps)(ReviewImagery); // curry component, pass as perameter as function
