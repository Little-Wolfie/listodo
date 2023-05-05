import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";

const SignOutButton = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSignOutClick = async () => {
    signOut(auth)
      .then(() => {
        console.log(auth)
        navigate("/login");
      })
      .catch((error) => {
        console.log("Error logging out:", error);
        setError(error.message);
      });
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <button onClick={handleSignOutClick}>Sign Out</button>
    </div>
  );
};

export default SignOutButton;
