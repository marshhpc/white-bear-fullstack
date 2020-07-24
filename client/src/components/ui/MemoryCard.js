import React from "react";
import editIcon from "../../icons/edit.svg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import actions from "../../store/actions";

class MemoryCard extends React.Component {
   storeEditablecard() {
      console.log("Storing editable cards ");

      this.props.dispatch({
         type: actions.STORE_EDITABLE_CARD,
         payload: {
            card: this.props.card,
            prevRoute: "/all-cards",
         },
      });
   }

   render() {
      return (
         <div>
            <div className="row mb-5">
               <div className="col-9">
                  <div className="card bg-primary">
                     <div className="card-body">{this.props.card.imagery}</div>
                  </div>
                  <div className="card bg-secondary">
                     <div className="card-body">{this.props.card.answer}</div>
                  </div>
               </div>
               <div className="col-3">
                  <Link
                     to="/edit"
                     className="btn btn-link"
                     onClick={() => {
                        this.storeEditablecard();
                     }}
                  >
                     <img
                        src={editIcon}
                        width="20px"
                        style={{ marginBottom: "5px", marginRight: "8px" }}
                        alt=""
                     />
                     Edit
                  </Link>
               </div>
            </div>
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {};
}
export default connect(mapStateToProps)(MemoryCard);
