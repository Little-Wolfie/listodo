import React, { useEffect, useState } from "react";
import "../../css/Profile.css";
import { updatePassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { storage } from "../../firebase/firebase";
import { ref, uploadBytesResumable } from "firebase/storage";
import CompletedTasks from "./CompletedTasks";

export const Profile = () => {
  const [showChangePasswordFields, setShowChangePasswordFields] =
    useState(false);
  const [showChangePasswordButton, setShowChangePasswordButton] =
    useState(true);

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [successfulPasswordChange, setSuccessfulPasswordChange] =
    useState(false);
  const [showChangeImageButton, setShowChangeImageButton] = useState(true);
  const [showChangeImageForm, setShowChangeImageForm] = useState(false);
  const [showCompletedTaskButton, setShowCompletedTaskButton] = useState(true);
  const [renderCompletedTask, setRenderCompletedTask] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const getUsersEmail = () => {
      onAuthStateChanged(auth, (userAuth) => {
        if (userAuth) {
          setEmail(userAuth.email);
        }
      });
    };
    getUsersEmail();
  }, []);

  const imageRef = ref(storage, "images/" + File.name);

  const handleImageSubmit = () => {
    uploadBytesResumable(imageRef, File).then(() => {
      console.log("upload Successful");
    });
  };

  const changePasswordButtonClickHandler = () => {
    setShowChangePasswordFields(true);
    setShowChangePasswordButton(false);
  };

  const handleImageButtonClick = () => {
    setShowChangeImageButton(false);
    setShowChangeImageForm(true);
  };
  const handleCompletedTasks = () => {
    setShowCompletedTaskButton(false);
    setRenderCompletedTask(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (newPassword !== confirmNewPassword) {
      setError("passwords do not match");
      return
    }
    if(!/[a-zA-Z0-9]/.test(newPassword) && !/[a-zA-Z0-9]/.test(confirmNewPassword)) {
      setError('password can not be blank')
      return 
    }


    updatePassword(user, newPassword).then(() => {
      setSuccessfulPasswordChange(true);
    })
    .catch((error) => {
      setError('Bad Request');
    })
  };

  return (
    <div className="profile">
      <header>
        <img
          className="profile-picture"
          src="./userIcon.png"
          alt="profile-picture"
        />
      </header>
      <div className="profile-container">
        {showChangeImageButton && (
          <button
            className="profile-img"
            onClick={handleImageButtonClick}
            type="button"
          >
            Upload File
          </button>
        )}
        {showChangeImageForm && (
          <form onSubmit={(e) => handleImageSubmit(e)}>
            <input type="file" accept="image/*" />
            <button type="submit">submit</button>
          </form>
        )}
        <p> Email: {email}</p>

        {showChangePasswordButton && (
          <button onClick={changePasswordButtonClickHandler}>
            Change Password
          </button>
        )}
        {showChangePasswordFields && (
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              placeholder="Enter new password..."
              value={newPassword}
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
            ></input>
            <input
              value={confirmNewPassword}
              placeholder="Confirm new password..."
              type="password"
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            ></input>
            <button type="submit">Submit</button>
            {error && <p>{error}</p>}
            {successfulPasswordChange && <p>Password Updated successfully</p>}
          </form>
        )}
        {showCompletedTaskButton && (
          <button onClick={handleCompletedTasks}>Completed Tasks</button>
        )}
        {renderCompletedTask && (
          <CompletedTasks
            setRenderCompletedTask={setRenderCompletedTask}
            setShowCompletedTaskButton={setShowCompletedTaskButton}
          />
        )}
      </div>
    </div>
  );
};
