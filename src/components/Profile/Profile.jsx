import React, { useEffect, useState } from 'react';
import "./Profile.css";
import Navbar from '../Navbar/Navbar';
import { ethers } from 'ethers';
import DeBlogProfileABI from '../../contracts/DeBlogProfile.json';

const profilecontractAddress = "0xdE80E7d6370457175D5Ae1B65aD051f9021Effc4";

const Profile = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState({
    username: "",
    avatarUrl: "",
    userAddress: ""
  });
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [loading, setLoading] = useState(false);

  // Connect wallet
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Metamask not detected!");
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setCurrentAccount(accounts[0]);
      setIsConnected(true);
    } catch (error) {
      console.error("Wallet connection failed", error);
      setError(error);
    }
  };

  // Check if user is registered
  const checkRegistered = async (address) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(profilecontractAddress, DeBlogProfileABI, provider);
      const userProfile = await contract.getProfile(address);

      if (userProfile.username) {
        setIsRegistered(true);
        setProfile({
          username: userProfile.username,
          avatarUrl: userProfile.avatarURL,
          userAddress: userProfile.userAddress
        });
      } else {
        setIsRegistered(false);
      }
    } catch (error) {
      console.error("Error fetching user profile", error);
      setError(error);
    }
  };

  // Register user
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, DeBlogProfileABI, signer);

      const tx = await contract.setProfile(username, avatarUrl);
      await tx.wait();

      alert('Profile registered successfully!');
      // Fetch updated profile
      checkRegistered(currentAccount);
    } catch (error) {
      console.error("Registration failed", error);
      alert('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected && currentAccount) {
      checkRegistered(currentAccount);
    }
  }, [isConnected, currentAccount]);

  return (
    <div className='profile'>
      <Navbar />

      {!isConnected ? (
        <div className="connectWallet">
          <p className='heading'>Connect Wallet</p>
          <img src="https://www.figma.com/community/resource/ad81a042-6cf3-4595-b892-b82ba0725d5c/thumbnail" alt="Connect" />
          <div onClick={connectWallet} className="connectButton">
            <p>Connect</p>
          </div>
        </div>
      ) : (
        <>
          {isRegistered ? (
            <div className="wrapper">
              <div className="user-profile">
                <p className="profile-heading">User Profile</p>
                <img
                  src={profile.avatarUrl}
                  alt="User Avatar"
                  className="profile-avatar"
                />
                <div className="profile-info">
                  <p className="profile-label">
                    <span>Username:</span> {profile.username}
                  </p>
                  <p className="profile-label">
                    <span>Avatar URL:</span> {profile.avatarUrl}
                  </p>
                  <p className="profile-label">
                    <span>User Address:</span> {profile.userAddress}
                  </p>
                </div>
                <button className="logout-button" onClick={() => window.location.reload()}>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="register">
              <p className="heading">Register Profile</p>

              <form onSubmit={handleRegister} className="register-form">
                <label className="label">
                  <span>Username:</span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    required
                  />
                </label>

                <label className="label">
                  <span>Avatar URL:</span>
                  <input
                    type="text"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    placeholder="Enter avatar URL"
                    required
                  />
                </label>

                <label className="label">
                  <span>Wallet Address:</span>
                  <input
                    type="text"
                    value={currentAccount}
                    disabled
                  />
                </label>

                <button type="submit" className="registerButton" disabled={loading}>
                  {loading ? "Registering..." : "Register"}
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
