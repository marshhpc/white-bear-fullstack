import React from "react";
import saveIcon from "../../icons/save.svg";
import AppTemplate from "../ui/AppTemplate";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { checkIsOver, Max_Card_Chars } from "../../utils/helpers";
import { connect } from "react-redux";
import actions from "../../store/actions";
import axios from "axios";

class CreateImagery extends React.Component {
   constructor(props) {
      super(props);
      console.log("in the edit component");
      this.state = {
         imageryText: "",
      };
   }

   checkHasInvalidCharCount() {
      if (
         this.state.imageryText.length > Max_Card_Chars ||
         this.state.imageryText.length === 0
      ) {
         return true;
      } else return false;
   }

   setImageryText(e) {
      this.setState({ imageryText: e.target.value });
   }

   async updateCreatableCard() {
      console.log("UPDATING CREATABLE CARD");
      const {
         id,
         answer,
         userId,
         createdAt,
         nextAttemptAt,
         lastAttemptAt,
         totalSuccessfulAttempts,
         level,
      } = this.props.creatableCard;
      await this.props.dispatch({
         type: actions.UPDATE_CREATABLE_CARD,
         payload: {
            // the card itself
            id,
            answer,
            imagery: this.state.imageryText,
            userId,
            createdAt,
            nextAttemptAt,
            lastAttemptAt,
            totalSuccessfulAttempts,
            level,
         },
      });
      // save to the database (make an api call)
      axios
         .post("/api/v1/memory-cards", this.props.creatableCard)
         .then((res) => {
            console.log("Memory Card Created");
            // Display success overlay
            // Route to "/create-answer"
         })

         .catch((err) => {
            const { data } = err.response;
            console.log(data);
            // Display error overlay
            // hide error overlay after 5 seconds
            // stay on this page
         });
   }

   render() {
      return (
         <AppTemplate>
            <div>
               <h3 className="d-flex justify-content-center mb-3 text-muted">
                  Add Memorable Imagery
               </h3>
            </div>
            <div className="mb-3">
               <div className="card bg-primary">
                  <div className="card-body">
                     <textarea
                        rows="6"
                        defaultValue={""}
                        onChange={(e) => this.setImageryText(e)}
                     ></textarea>
                  </div>
               </div>
               <div className="card bg-secondary">
                  <div className="card-body" id="imagery-answer">
                     {this.props.creatableCard.answer}
                  </div>
               </div>
            </div>
            <div>
               <div className="float-right mb-2">
                  <span
                     className={classnames({
                        "text-danger": checkIsOver(
                           this.state.imageryText,
                           Max_Card_Chars
                        ),
                     })}
                  >
                     {this.state.imageryText.length}/{Max_Card_Chars}
                  </span>
               </div>
               <div className="clearfix"></div>
               <Link to="/create-answer" id="back-to" className="btn btn-link">
                  Back to answer
               </Link>
               <div className="float-right">
                  <button
                     className={classnames(
                        "btn btn-lg btn-secondary text-white",
                        {
                           disabled: this.checkHasInvalidCharCount(),
                        }
                     )}
                     onClick={() => {
                        this.updateCreatableCard();
                     }}
                  >
                     <img
                        src={saveIcon}
                        width="25px"
                        style={{ marginBottom: "2px", marginRight: "4px" }}
                        className="mr-2 text-center"
                        alt=""
                     />
                     Save
                  </button>
               </div>
            </div>
         </AppTemplate>
      );
   }
}

function mapStateToProps(state) {
   return { creatableCard: state.creatableCard };
}
export default connect(mapStateToProps)(CreateImagery);
