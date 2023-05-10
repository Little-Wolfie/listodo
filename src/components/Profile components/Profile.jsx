import React, { useEffect, useState } from "react";
import "../../css/Profile.css";
import {
  updatePassword,
  onAuthStateChanged,
  updateProfile,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { storage } from "../../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import CompletedTasks from "./CompletedTasks";
import SignOutButton from "./SignOutButton";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { FaLock } from "react-icons/fa";

export const Profile = () => {
  const [showChangePasswordFields, setShowChangePasswordFields] =
    useState(false);
  const [showChangePasswordButton, setShowChangePasswordButton] =
    useState(true);

  const [oldPassword, setOldPassword] = useState("");
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
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    const getUserDetails = () => {
      onAuthStateChanged(auth, (userAuth) => {
        if (userAuth) {
          setEmail(userAuth.email);
          setProfilePicture(userAuth.photoURL);
        }
      });
    };
    getUserDetails();
  }, []);

  const handleImageSubmit = (e) => {
    e.preventDefault();
    const imageRef = ref(storage, "images/" + e.target[0].files[0].name);
    uploadBytesResumable(imageRef, e.target[0].files[0])
      .then((image) => {
        return getDownloadURL(ref(storage, image.ref.fullPath));
      })
      .then((URL) => {
        return updateProfile(auth.currentUser, { photoURL: URL });
      })
      .then(() => {
        setProfilePicture(auth.currentUser.photoURL);
        console.log("Profile Picture change successful");
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
      return;
    }
    if (
      !/[a-zA-Z0-9]/.test(newPassword) &&
      !/[a-zA-Z0-9]/.test(confirmNewPassword)
    ) {
      setError("password can not be blank");
      return;
    }

    const credential = EmailAuthProvider.credential(user.email, oldPassword);
    reauthenticateWithCredential(user, credential)
      .then(() => {
        updatePassword(user, newPassword);
      })
      .then(() => {
        setSuccessfulPasswordChange(true);
      })
      .catch((error) => {
        setError("Bad Request");
      });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="profile">
      <header>
        <img
          className="profile-picture rounded-circle img-thumbnail"
          src={profilePicture ? profilePicture : "userIcon.png"}
          alt="profile-picture"
        />
      </header>
      <div className="profile-container">
        <SignOutButton className="mb-3" />

        {showChangeImageButton && (
          <Button
          
          variant="primary"
            className="profile-img mb-3" 
            onClick={handleImageButtonClick}
            type="button"
            
          >
            Upload File
          </Button>
        )}
        {showChangeImageForm && (
          <Form
            method="post"
            encType="multipart/form-data"
            onSubmit={(e) => handleImageSubmit(e)}
          >
            <Form.Group controlId="formBasicEmail" className="mb-3" >
            <input type="file"  accept="image/*" />
            </Form.Group>
            <Button variant="primary" className="mb-3"  type="submit">submit</Button>
            
          </Form>
        )}
        <p> Email: {email}</p>

        {showChangePasswordButton && (
          <Button variant="primary" className="mb-3"  onClick={changePasswordButtonClickHandler}>
            Change Password
          </Button>
        )}
        {showChangePasswordFields && (
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <InputGroup>
                <InputGroup.Text>
                  <FaLock />
                </InputGroup.Text>
                <FormControl
                  placeholder="Enter old password..."
                  value={oldPassword}
                  type="password"
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <InputGroup>
            <InputGroup.Text>
                  <FaLock />
                </InputGroup.Text>
            <FormControl
              placeholder="Enter new password..."
              value={newPassword}
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <InputGroup>
            <InputGroup.Text>
                  <FaLock />
                </InputGroup.Text>
            <Form.Control
              value={confirmNewPassword}
              placeholder="Confirm new password..."
              type="password"
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            </InputGroup>
            </Form.Group>
            <Button variant="primary"  className="mb-3" type="submit">Submit</Button>
            {error && <p>{error}</p>}
            {successfulPasswordChange && <p>Password Updated successfully</p>}
            
          </Form>
        )}
        {showCompletedTaskButton && (
          <Button variant="danger"  className="mb-3" onClick={handleCompletedTasks}>Completed Tasks</Button>
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
