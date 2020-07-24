import React from "react";
import landingLogo from "../../img/logo-landing.png";
import Signup from "../ui/SignUp";
import LogIn from "../ui/Login";

export default function Landing() {
   return (
      <>
         <div className="background-image">
            <div className="container">
               <div className="row">
                  <div className="col-12 mt-xl-7 mt-lg-5  mt-4 branding-margin">
                     <img
                        src={landingLogo}
                        alt="White Bear logo"
                        className="float-left mr-6 logo-img-fluid"
                     />
                     <h1 className="text-brand text-white mt-2 mt-sm-0 mt-lg-2 logo-text-fluid">
                        White Bear
                     </h1>
                  </div>
               </div>
               <div className="row mt-md-6 mt-xl-8 mt-4">
                  <div className="col-xl-10 offset-xl-1 col-lg-10 offset-lg-1 col-12">
                     <div className="row">
                        <Signup />
                        <LogIn />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
