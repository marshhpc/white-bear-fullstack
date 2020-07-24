import React from "react";
import AppTemplate from "../ui/AppTemplate";
import { Link } from "react-router-dom";
import saveIcon from "../../icons/save.svg";
import memoryCards from "../../moc-data/memory-cards";
import toDisplayDate from "date-fns/format";
import classnames from "classnames";
import { checkIsOver, Max_Card_Chars } from "../../utils/helpers";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import without from "lodash/without";
import actions from "../../store/actions";

const memoryCard = memoryCards[0];

class Edit extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         answerText: memoryCard.answer,
         imageryText: memoryCard.imagery,
         isShowDeleteChecked: false,
         isDeleteButtonDisplayed: false,
      };
   }

   checkHasInvalidCharCount() {
      if (
         this.state.answerText.length > Max_Card_Chars ||
         this.state.answerText.length === 0 ||
         this.state.imageryText.length > Max_Card_Chars ||
         this.state.imageryText.length === 0
      ) {
         return true;
      } else return false;
   }

   setImageryText(e) {
      this.setState({ imageryText: e.target.value });
   }

   setAnswerText(e) {
      this.setState({ answerText: e.target.value });
   }
   showDeleteButton() {
      this.setState({ isDeleteChecked: !this.state.isDeleteChecked });
   }

   deleteCard() {
      // delete from database
      if (this.props.editableCard.prevRoute === "/review-answer") {
         this.deleteCardFromStore();
      }
      if (this.props.editableCard.prevRoute === "/all-cards") {
         this.props.history.push("/all-cards");
      }
   }

   deleteCardFromStore() {
      const deletedCard = this.props.editableCard.card;
      const cards = this.props.queue.cards;
      const filteredCards = without(cards, deletedCard);
      console.log(filteredCards);
      this.props.dispatch({
         type: actions.STORE_QUEUED_CARDS,
         payload: filteredCards,
      });
      if (filteredCards[this.props.queue.index] === undefined) {
         this.props.history.push("/review-empty");
      } else {
         this.props.history.push("/review-imagery");
      }
   }

   render() {
      console.log("this.props.editableCard", this.props.editableCard);
      return (
         <AppTemplate>
            <h4 className="my-4 text-center text-muted">Edit Cards</h4>
            {isEmpty(this.props.editableCard) === false && (
               <>
                  <div className="mb-2">
                     <div className="card bg-primary">
                        <div className="card-body">
                           <textarea
                              rows="2"
                              defaultValue={
                                 this.props.editableCard.card.imagery
                              }
                              onChange={(e) => this.setImageryText(e)}
                           ></textarea>
                        </div>
                     </div>

                     <div className="card bg-secondary">
                        <div className="card-body">
                           <textarea
                              rows="2"
                              defaultValue={this.props.editableCard.card.answer}
                              onChange={(e) => this.setAnswerText(e)}
                           ></textarea>
                        </div>
                     </div>
                  </div>
                  <p className="float-right mb-5 mt-2 text-muted">
                     <span
                        className={classnames({
                           "text-danger": checkIsOver(
                              this.state.imageryText,
                              Max_Card_Chars
                           ),
                        })}
                     >
                        Top:
                        {this.state.imageryText.length}/{Max_Card_Chars}
                     </span>
                     &nbsp;&nbsp;&nbsp;&nbsp;
                     <span
                        className={classnames({
                           "text-danger": checkIsOver(
                              this.state.answerText,
                              Max_Card_Chars
                           ),
                        })}
                     >
                        Bottom:
                        {this.state.answerText.length}/{Max_Card_Chars}
                     </span>
                  </p>
                  <div className="clearfix"></div>
                  <Link
                     to={this.props.editableCard.prevRoute}
                     type="button"
                     className="btn btn-link"
                     id="create-error"
                  >
                     Discard changes
                  </Link>

                  <Link
                     to={this.props.editableCard.prevRoute}
                     className={classnames(
                        "btn btn-primary float-right btn-lg",
                        {
                           disabled: this.checkHasInvalidCharCount(),
                        }
                     )}
                     id="save-imagery"
                  >
                     <img
                        src={saveIcon}
                        width="20px"
                        style={{ marginBottom: "3px" }}
                        className="mr-2"
                        alt=""
                     />
                     Save
                  </Link>
                  <h4 className="my-8 text-center text-muted">
                     Card Properties
                  </h4>
                  <div className="row">
                     <div className="col-4 d-flex">
                        <h6 className="text-muted">Created on:</h6>
                     </div>
                     <div className="col-4 ml-6 d-flex">
                        <h6 className="">
                           {toDisplayDate(
                              this.props.editableCard.card.createdAt,
                              "MMM. d, y"
                           )}
                        </h6>
                     </div>
                  </div>
                  <div className="row">
                     <div className="col-4 d-flex">
                        <h6 className="text-muted">Last attempt:</h6>
                     </div>
                     <div className="col-4 d-flex ml-6">
                        <h6 className="">
                           {toDisplayDate(
                              this.props.editableCard.card.lastAttemtAt,
                              "MMM. d, y"
                           )}
                        </h6>
                     </div>
                  </div>
                  <div className="row">
                     <div className="col-4 d-flex">
                        <h6 className="text-muted">Next attempt:</h6>
                     </div>
                     <div className="col-4 ml-6 d-flex">
                        <h6 className="">
                           {toDisplayDate(
                              this.props.editableCard.card.nextAttemptAt,
                              "MMM. d, y"
                           )}
                        </h6>
                     </div>
                  </div>
                  <div className="row">
                     <div className="col-4 d-flex">
                        <h6 className="text-muted">Consecutives:</h6>
                     </div>
                     <div className="col-4 ml-6 d-flex">
                        <h6 className="">
                           {
                              this.props.editableCard.card
                                 .totalSuccessfulAttempts
                           }
                        </h6>
                     </div>
                  </div>
                  <div className="row">
                     <div className="col-6 mt-2">
                        <div className="custom-control custom-checkbox">
                           <input
                              type="checkbox"
                              className="custom-control-input"
                              id="show-delete"
                              onClick={() => {
                                 this.showDeleteButton();
                              }}
                           />
                           <label
                              className="custom-control-label"
                              htmlFor="show-delete"
                           >
                              Show delete button
                           </label>
                        </div>
                     </div>
                  </div>
                  {this.state.isDeleteChecked && (
                     <button
                        className="btn btn-lg btn-outline-danger my-4"
                        onClick={() => {
                           this.deleteCard();
                        }}
                     >
                        Delete this card
                     </button>
                  )}
               </>
            )}
         </AppTemplate>
      );
   }
}

function mapStateToProps(state) {
   return {
      editableCard: state.editableCard,
      queue: state.queue,
   };
}
export default connect(mapStateToProps)(Edit);
