import React, { useEffect, useState } from "react";
import "../../css/Profile.css";
import { updatePassword, onAuthStateChanged, updateProfile, EmailAuthProvider, reauthenticateWithCredential} from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { storage } from "../../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import CompletedTasks from "./CompletedTasks";

export const Profile = () => {
  const [showChangePasswordFields, setShowChangePasswordFields] =
    useState(false);
  const [showChangePasswordButton, setShowChangePasswordButton] =
    useState(true);

  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [successfulPasswordChange, setSuccessfulPasswordChange] =
    useState(false);
  const [showChangeImageButton, setShowChangeImageButton] = useState(true);
  const [showChangeImageForm, setShowChangeImageForm] = useState(false);
  const [showCompletedTaskButton, setShowCompletedTaskButton] = useState(true);
  const [renderCompletedTask, setRenderCompletedTask] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [profilePicture, setProfilePicture] = useState("")

  
  useEffect(() => {
    const getUserDetails = () => {
      onAuthStateChanged(auth, (userAuth) => {
        if (userAuth) {
          setEmail(userAuth.email);
          setProfilePicture(userAuth.photoURL)
        }
      });
    };
    getUserDetails()

  }, []);

  const handleImageSubmit = (e) => {
    e.preventDefault();
    const imageRef = ref(storage, "images/" + e.target[0].files[0].name);
    uploadBytesResumable(imageRef, e.target[0].files[0])
    .then((image) => {
      return getDownloadURL(ref(storage, image.ref.fullPath))
    })
    .then((URL) => {
      return updateProfile(auth.currentUser, {photoURL: URL})
    })
    .then(() => {
      setProfilePicture(auth.currentUser.photoURL)
      console.log("Profile Picture change successful")
    })
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

    const credential = EmailAuthProvider.credential(user.email, oldPassword)
    reauthenticateWithCredential(user, credential)
    .then(() => {
      updatePassword(user, newPassword)
    })
    .then(() => {
      setSuccessfulPasswordChange(true);
    })
    .catch((error) => {
      setError('Bad Request');
    })
  };

  if(isLoading) return <p>Loading...</p>

  return (
    <div className="profile">
      <header>
        <img
          className="profile-picture"
          src={profilePicture ? profilePicture: "../../public/userIcon.png"}
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
          <form method="post" encType="multipart/form-data" onSubmit={(e) => handleImageSubmit(e)}>
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
            <input placeholder="Enter old password..."
              value={oldPassword}
              type="password"
              onChange={(e) => setOldPassword(e.target.value)}
            ></input>
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
