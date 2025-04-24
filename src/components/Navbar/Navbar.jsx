import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='navbar'>
      <p className='title'>DeBlogger</p>
      <div className="searchBar">
        <p>Search by username...</p>
        <div className="searchButton"></div>
      </div>
      <div className="navbarButtons">
        <p>Home</p>
        <p>Blogs</p>
        <p>Profile</p>
        <p>About</p>
      </div>
    </div>
  )
}

export default Navbar
