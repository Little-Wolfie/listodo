import React, { useState } from 'react'
import { Register } from './Register';
import { SignIn } from './SignIn';
import "../../css/LandingPage.css";

export const LandingPage = () => {
  const [regPopup, setRegPopup] = useState(false)
  const [signInPopup, setSignInPopup] = useState(false)
  
  const regClickHandler = () => {
    setRegPopup(true)
  }
  const signInClickHandler = () => {
    setSignInPopup(true)
  }
  return (
    <div className='landing-page-container'>
    <div className='landing-page'>
      <div className='logo'>
        LOGO
      </div>
      <button className='register-button' onClick={regClickHandler}>Register</button>
      <button className='existing-user-button' onClick={signInClickHandler}>Existing User</button>
      {regPopup && <Register />}
      {signInPopup && <SignIn />}
    </div>
    </div>
  )
}
