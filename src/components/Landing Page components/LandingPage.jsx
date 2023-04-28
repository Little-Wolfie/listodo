import React, { useState } from "react";
import { Register } from "./Register";
import { SignIn } from "./SignIn";
import "../../css/LandingPage.css";

export const LandingPage = () => {
  const [regPopup, setRegPopup] = useState(false);
  const [signInPopup, setSignInPopup] = useState(false);
  const [showRegisterButton, setShowRegisterButton] = useState(true);
  const [showExistingUserButton, setShowExistingUserButton] = useState(true);

  const regClickHandler = () => {
    setShowRegisterButton(false);
    setShowExistingUserButton(false);
    setRegPopup(true);
  };
  const signInClickHandler = () => {
    setShowExistingUserButton(false);
    setShowRegisterButton(false);
    setSignInPopup(true);
  };
  return (
    <div className="landing-page-container">
      <div className="landing-page">
        <div className="logo"></div>
        {showRegisterButton && (
          <button className="register-button" onClick={regClickHandler}>
            Register
          </button>
        )}

        {regPopup && <Register />}
        {showExistingUserButton && (
          <button className="existing-user-button"  onClick={signInClickHandler}>
            Existing User
          </button>
        )}
        {signInPopup && <SignIn />}
      </div>
    </div>
  );
};
