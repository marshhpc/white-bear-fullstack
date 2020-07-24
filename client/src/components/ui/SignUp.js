import React from "react";
import classnames from "classnames";
import hash from "object-hash";
import { v4 as getUuid } from "uuid";
import { withRouter } from "react-router-dom";
import { EMAIL_REGEX } from "../../utils/helpers";
import axios from "axios";
import actions from "../../store/actions";
import { connect } from "react-redux";

class SignUp extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         isDisplayingInputs: false,
         emailError: "",
         passwordError: "",
         hasEmailError: false,
         hasPasswordError: false,
      };
   }

   showInputs() {
      this.setState({
         isDisplayingInputs: true,
      });
   }

   async setEmailState(emailInput) {
      const lowerCasedEmailInput = emailInput.toLowerCase();
      if (emailInput === "")
         this.setState({
            emailError: "Please enter your email address.",
            hasEmailError: true,
         });
      else if (EMAIL_REGEX.test(lowerCasedEmailInput) === false) {
         console.log("Not A Valid Email");
         this.setState({
            emailError: "Please enter a valid email address.",
            hasEmailError: true,
         });
      } else {
         this.setState({ emailError: "", hasEmailError: false });
      }
   }

   checkHasLocalPart(passwordInput, emailInput) {
      const localPart = emailInput.split("@")[0];
      if (localPart === "") return false;
      else if (localPart.length < 4) return false;
      else return passwordInput.includes(localPart);
   }

   async setPasswordState(passwordInput, emailInput) {
      console.log(passwordInput);

      const uniqChars = [...new Set(passwordInput)];

      if (passwordInput === "") {
         this.setState({
            passwordError: "Please create password.",
            hasPasswordError: true,
         });
      } else if (passwordInput.length < 9) {
         this.setState({
            passwordError: "Your password must be at least 9 characters.",
            hasPasswordError: true,
         });
      } else if (this.checkHasLocalPart(passwordInput, emailInput)) {
         this.setState({
            passwordError:
               "For you safety, your password cannot contain you email address.",
            hasPasswordError: true,
         });
      } else if (uniqChars.length < 3) {
         this.setState({
            passwordError:
               "For you safety, your password most contain at least 3 unique characters.",
            hasPasswordError: true,
         });
      } else {
         this.setState({ passwordError: "", hasPasswordError: false });
      }
   }

   async validdateAndCreateUser() {
      const emailInput = document.getElementById("email-input").value;
      const passwordInput = document.getElementById("password-input").value;
      await this.setEmailState(emailInput);
      await this.setPasswordState(passwordInput, emailInput);
      if (
         this.state.hasEmailError === false &&
         this.state.hasPasswordError === false
      ) {
         const user = {
            id: getUuid(),
            email: emailInput,
            password: hash(passwordInput),
            createdAt: Date.now(),
         };
         console.log("created userobject for post", user);
         // mimic api response
         axios
            .get(
               "https://raw.githubusercontent.com/marshhpc/white-bear-mpa/master/src/moc-data/user.json"
            )
            .then((res) => {
               // handle success

               const currentUser = res.data;
               console.log(currentUser);
               this.props.dispatch({
                  type: actions.UPDATE_CURRENT_USER,
                  payload: res.data,
               });
            })
            .catch((error) => {
               // handle error
               console.log(error);
            });

         // redirect the user
         this.props.history.push("/create-answer");
      }
      this.props.history.push("/create-answer");
   }

   render() {
      return (
         <div className="col-xl-5 col-sm-6 col-12 mb-6">
            <div className="card">
               <div className="card-body text-dark text-sans">
                  <h2 className="card-title text-serif">Nice to meet you</h2>
                  <p className="card-text mb-4">
                     Sign up for White Bear.Free Forever.
                  </p>
                  {this.state.isDisplayingInputs && (
                     <>
                        <p className="text-success mb-4">
                           Lets get you signed up.
                        </p>

                        <label className="input-text" htmlFor="email-input">
                           Email address
                        </label>
                        <input
                           type="email"
                           className={classnames({
                              "form-control": true,
                              "mb-2": true,
                              "is-invalid": this.state.hasEmailError,
                           })}
                           id="email-input"
                        />
                        {this.state.hasEmailError && (
                           <p className="text-danger">
                              {this.state.emailError}
                           </p>
                        )}

                        <div className="mb-4"></div>

                        <label className="input-text" htmlFor="password-input">
                           Create a password
                        </label>
                        <input
                           type="password"
                           className={classnames({
                              "form-control": true,
                              "mb-2": true,
                              "is-invalid": this.state.hasPasswordError,
                           })}
                           id="password-input"
                        />
                        {this.state.hasPasswordError && (
                           <p className="text-danger">
                              {this.state.passwordError}
                           </p>
                        )}

                        <button
                           to="/create-answer"
                           className="btn btn-success btn-landing btn-block mt-5"
                           onClick={() => {
                              this.validdateAndCreateUser();
                           }}
                        >
                           Lets go!
                        </button>
                     </>
                  )}

                  {!this.state.isDisplayingInputs && (
                     <button
                        className="btn btn-success btn-block"
                        onClick={() => {
                           this.showInputs();
                        }}
                     >
                        Sign up
                     </button>
                  )}
               </div>
            </div>
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {};
}
export default withRouter(connect(mapStateToProps)(SignUp));
