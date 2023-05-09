import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { Button} from 'react-bootstrap';

const SignOutButton = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSignOutClick = async () => {
    signOut(auth)
      .then(() => {
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
      <Button variant="danger" className="mb-3"  onClick={handleSignOutClick}>Sign Out</Button>
    </div>
  );
};

export default SignOutButton;
