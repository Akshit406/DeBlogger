import React from 'react'
import "./Profile.css"
import Navbar from '../Navbar/Navbar'

const Profile = () => {
  return (
    <div className='profile'>
      <Navbar />

      <div className="wrapper">
      {/* <div className="user-profile">
        <p className="profile-heading">User Profile</p>
        <img
          src="https://avatar.iran.liara.run/public"
          alt="User Avatar"
          className="profile-avatar"
        />
        <div className="profile-info">
          <p className="profile-label">
            <span>Username:</span> Akshit323_
          </p>
          <p className="profile-label">
            <span>Avatar URL:</span> http://wwww.jbsdjbj.538a3874e4b0ab1541d204ad...
          </p>
          <p className="profile-label">
            <span>User Address:</span> 0x5ABD23b056191A516a78E76C967988B5D17fDaa9
          </p>
        </div>
        <button className="logout-button">Logout</button>
      </div> */}



        {/* <div className="connectWallet">
          <p className='heading'>Connect Wallet</p>
          <img src="https://www.figma.com/community/resource/ad81a042-6cf3-4595-b892-b82ba0725d5c/thumbnail" alt="" />
          <div className="connectButton">
            <p>Connect</p>
          </div>          
        </div> */}


        <div className="register">
          <p className="heading">Register Profile</p>

          <form className="register-form">
            <label className="label">
              <span>Username:</span>
              <input type="text" name="username" placeholder="Enter username" required />
            </label>

            <label className="label">
              <span>Avatar URL:</span>
              <input type="text" name="avatarUrl" placeholder="Enter avatar URL" required />
            </label>

            <label className="label">
              <span>User Address:</span>
              <input type="text" name="userAddress" placeholder="Your wallet address" required disabled />
            </label>

            <button type="submit" className="registerButton">Register</button>
          </form>
          </div>


        
        

      </div>
    </div>
  )
}

export default Profile
