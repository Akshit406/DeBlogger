import React from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className='navbar'>
      <img src="../../src/assets/1572.jpg" className="navbarImg" alt="" />
      <p className='title'>DeBlogger</p>
      <div className="searchBar">
        <p>Search by username...</p>
        <div className="searchButton"></div>
      </div>
      <div className="navbarButtons">
        <p onClick={()=>{navigate("/")}}> Home</p>
        <p onClick={()=>{navigate("/blogsPage")}}>Blogs</p>
        <p onClick={()=>{navigate("/profile")}}> Profile</p>
        <p className='createPage' onClick={()=>{navigate("/createBlog")}}>Create</p>
      </div>
    </div>
  )
}

export default Navbar
