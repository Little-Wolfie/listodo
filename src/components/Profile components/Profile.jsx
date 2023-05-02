import React, { useState } from 'react'
import '../../css/Profile.css'
import { UserContext } from '../../contexts/UserContext'
import { useContext } from 'react'
import { updatePassword } from 'firebase/auth'
import {auth} from "../../firebase/firebase"

export const Profile = () => {

  const {user, setUser} = useContext(UserContext)
  const [showChangePasswordFields, setShowChangePasswordFields] = useState(false)
  const [showChangePasswordButton, setShowChangePasswordButton] = useState(true)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [error, setError] = useState("")

  const changePasswordClickhandler = () => {
      setShowChangePasswordFields(true)
      setShowChangePasswordButton(false)
  }

  const userAuth = auth.currentUser
  console.log(userAuth)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if(newPassword === confirmNewPassword){
      
    }
  }

  return (
    <div className='profile'>
      <header>
        <img className='profile-picture' src='./userIcon.png' alt="profile-picture" />
      </header>
      <div className='profile-container'>
        <p> Email: {user.email}</p>
  
        {showChangePasswordButton && <button onClick={changePasswordClickhandler}>Change Password</button>}
        {showChangePasswordFields && 
        <form onSubmit={(e) => handleSubmit(e)}>
          <input placeholder='Enter current password...' type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}></input> 
          <input placeholder='Enter new password...' value={newPassword} type='password' onChange={(e) => setNewPassword(e.target.value)}></input>
          <input value={confirmNewPassword} placeholder='Confirm new password...' type='password' onChange={(e) => setConfirmNewPassword(e.target.value)}></input>
          <button type='submit'>Submit</button> 
          {error && <p>Invalid password</p>} 
        </form>}
        <p> View completed tasks </p>
        <p> Log out </p>

      </div>
    </div>
  )
}
