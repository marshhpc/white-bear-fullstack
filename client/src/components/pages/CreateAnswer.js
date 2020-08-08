import React from "react";
import AppTemplate from "../ui/AppTemplate";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { checkIsOver, Max_Card_Chars, defaultLevel } from "../../utils/helpers";
import { connect } from "react-redux";
import actions from "../../store/actions";
import { v4 as getUuid } from "uuid";
import getNextAttemptAt from "../../utils/getNextAttemptAt";

class CreateAnswer extends React.Component {
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

   setCreatableCard() {
      console.log("UPDATE_CREATABLE_CARD");
      const currentTime = Date.now();
      this.props.dispatch({
         type: actions.UPDATE_CREATABLE_CARD,
         payload: {
            // the card itself
            id: getUuid(),
            answer: "",
            imagery: "",
            userId: "",
            createdAt: currentTime,
            nextAtemptAt: getNextAttemptAt(defaultLevel, currentTime), //
            LasAttemptAt: currentTime,
            totalSuccessfulAttempts: 0,
            level: 1,
         },
      });
   }

   render() {
      return (
         <AppTemplate>
            <h4 className="d-flex justify-content-center">Add an answer</h4>
            <div className="mb-5 mt-2">
               <div className="card bg-secondary">
                  <div className="card-body">
                     <textarea
                        rows="4"
                        defaultValue={""}
                        onChange={(e) => this.setImageryText(e)}
                     ></textarea>
                  </div>
               </div>

               <div className="float-right my-3">
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

               <button
                  className={classnames(
                     "btn btn-outline-primary btn-lg ml-4 float-right",
                     {
                        disabled: this.checkHasInvalidCharCount(),
                     }
                  )}
                  onClick={() => {
                     this.setCreatableCard();
                  }}
               >
                  Next
               </button>
            </div>
         </AppTemplate>
      );
   }
}

function mapStateToProps(state) {
   return {};
}
export default connect(mapStateToProps)(CreateAnswer);
