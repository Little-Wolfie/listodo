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
      <div className="landing-page-container p-3 rounded">
        <div className="landing-page">
          <div className="logo">Welcome to Map Your Day</div>

          {regPopup && <Register />}
          {showExistingUserButton && (
            <Button
              variant="danger"
              className="existing-user-button mt-2"
              onClick={signInClickHandler}
            >
              Existing User
            </Button>
          )}
          
          {signInPopup && <SignIn />}
          {showOr && 
            <div className="or-container d-flex align-items-center justify-content-center my-4">
              <hr className="border-top border-2 border-secondary w-25 me-3" />
              <span className="or-text">OR</span>
              <hr className="border-top border-2 border-secondary w-25 ms-3" />
            </div>
          }

          {showRegisterButton && (
            <Button
              variant="success"
              className="register-button mb-2"
              onClick={regClickHandler}
            >
              Register
            </Button>
          )}
          
        </div>
      </div>
    </main>
  );
};
