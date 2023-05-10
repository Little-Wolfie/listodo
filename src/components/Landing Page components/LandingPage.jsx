import React, { useState } from "react";
import { Register } from "./Register";
import { SignIn } from "./SignIn";
import "../../css/LandingPage.css";
import { Button } from "react-bootstrap";

export const LandingPage = () => {
  const [regPopup, setRegPopup] = useState(false);
  const [signInPopup, setSignInPopup] = useState(false);
  const [showRegisterButton, setShowRegisterButton] = useState(true);
  const [showExistingUserButton, setShowExistingUserButton] = useState(true);
  const [showOr, setShowOr] = useState(true);

  const regClickHandler = () => {
    setShowRegisterButton(false);
    setShowExistingUserButton(false);
    setRegPopup(true);
    setShowOr(false);
  };
  const signInClickHandler = () => {
    setShowExistingUserButton(false);
    setShowRegisterButton(false);
    setShowOr(false);
    setSignInPopup(true);
  };
  return (
    <main className="flex-box">
      <div className="landing-page-container p-3">
        
          <img src="LandingPageLogo.png"/>
          <div className="logo">Map Your Day</div>

          {regPopup && <Register 
            setRegPopup={setRegPopup}
            setShowRegisterButton={setShowRegisterButton}
            setShowExistingUserButton={setShowExistingUserButton}
            setShowOr={setShowOr} 
          />}
          {showExistingUserButton && (
            <Button
              variant="danger"
              className="existing-user-button mt-2"
              onClick={signInClickHandler}
            >
              Existing User
            </Button>
          )}
          
          {signInPopup && <SignIn 
            setSignInPopup={setSignInPopup}
            setShowRegisterButton={setShowRegisterButton}
            setShowExistingUserButton={setShowExistingUserButton}
            setShowOr={setShowOr} 
          />}
          {showOr && 
            <div className="or-container d-flex align-items-center justify-content-center my-4">
              <span className="or-text">OR</span>
            </div>
          }

          {showRegisterButton && (
            <Button
              variant="danger"
              className="register-button mb-2"
              onClick={regClickHandler}
            >
              Register
            </Button>
          )}
          
        
      </div>
    </main>
  );
};
