import React from "react";
import saveIcon from "../../icons/save.svg";
import AppTemplate from "../ui/AppTemplate";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { checkIsOver, Max_Card_Chars } from "../../utils/helpers";

export default class CreateImagery extends React.Component {
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
                     Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                     Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                     natoque penatibus et magnis dis parturient montes, nascetur
                     ridiculus mus. Donec quam felis, ultricies nec,
                     pellentesque eu, pretium quis, sem. Nulla consequat massa
                     quis enim. Donec pede justo, fringilla vel, aliquet nec,
                     vulputate
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
                  <Link
                     to="/create-answer"
                     className={classnames(
                        "btn btn-lg btn-secondary text-white",
                        {
                           disabled: this.checkHasInvalidCharCount(),
                        }
                     )}
                  >
                     <img
                        src={saveIcon}
                        width="25px"
                        style={{ marginBottom: "2px", marginRight: "4px" }}
                        className="mr-2 text-center"
                        alt=""
                     />
                     Save
                  </Link>
               </div>
            </div>
         </AppTemplate>
      );
   }
}
