import React from "react";
import thumbsUpIcon from "../../icons/thumbs-up.svg";
import AppTemplate from "../ui/AppTemplate";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import actions from "../../store/actions";

// const memoryCard = memoryCards[0];

class ReviewAnswer extends React.Component {
   constructor(props) {
      super(props);
      if (this.props.queue.cards.length === 0) {
         this.props.history.push("/review-empty");
      }
   }

   goToNextCard() {
      if (this.props.queue.index === this.props.queue.cards.length - 1) {
         // youre on the last card
         this.props.dispatch({ type: actions.INCREMENT_QUEUE_INDEX });
         this.props.history.push("/review-empty");
      } else {
         this.props.dispatch({ type: actions.INCREMENT_QUEUE_INDEX });
         this.props.history.push("/review-imagery");
      }
   }

   storeEditablecard() {
      console.log("Storing editable cards ");
      const memoryCard = this.props.queue.cards[this.props.queue.index];
      console.log("memoryCard", memoryCard);
      this.props.dispatch({
         type: actions.STORE_EDITABLE_CARD,
         payload: {
            card: memoryCard,
            prevRoute: "/review-answer",
         },
      });
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
               <div className="card bg-secondary">
                  <div className="card-body">
                     {memoryCard && memoryCard.answer}
                  </div>
               </div>
            </div>
            <div>
               <Link
                  to="/edit"
                  className="btn btn-link"
                  onClick={() => {
                     this.storeEditablecard();
                  }}
               >
                  Edit
               </Link>
               <div className="float-right">
                  <button
                     to="review-empty"
                     className="btn btn-outline-primary mr-4"
                     onClick={() => {
                        this.goToNextCard();
                     }}
                  >
                     Needs work
                  </button>
                  <button
                     className="btn btn-primary"
                     onClick={() => {
                        this.goToNextCard();
                     }}
                  >
                     <img
                        src={thumbsUpIcon}
                        width="20px"
                        style={{ marginBottom: "5px", marginRight: "8px" }}
                        className="mr-2"
                        alt="thumbs-up-icon"
                     />
                     Got it
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
export default connect(mapStateToProps)(ReviewAnswer);
