import React from 'react'
import '../../css/Profile.css'

export const Profile = () => {
  return (
    <div className='profile'>
      <header>
        <img className='profile-picture' src='./userIcon.png' alt  />
      </header>
      <div className='profile-container'>
        <p> Email: </p>
        <p> Change Password </p>
        <p> View completed tasks </p>
        <p> Log out </p>

      </div>
    </div>
  )
}
