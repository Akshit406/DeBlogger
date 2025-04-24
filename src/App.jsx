import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
import BlogsPage from './components/BlogsPage/BlogsPage';
import Profile from './components/Profile/Profile';

const App = () => {
  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/blogsPage" element={<BlogsPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
