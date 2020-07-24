import React from "react";
import AppTemplate from "../ui/AppTemplate";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { checkIsOver, Max_Card_Chars } from "../../utils/helpers";

export default class CreateAnswer extends React.Component {
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

               <Link
                  to="/create-imagery"
                  className={classnames("btn btn-outline-primary btn-lg", {
                     disabled: this.checkHasInvalidCharCount(),
                  })}
                  style={{ float: "right" }}
               >
                  Next
               </Link>
            </div>
         </AppTemplate>
      );
   }
}
