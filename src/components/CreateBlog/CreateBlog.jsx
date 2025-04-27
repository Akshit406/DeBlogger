import React from 'react';
import Navbar from '../Navbar/Navbar';
import './CreateBlog.css';

const CreateBlog = () => {
  return (
    <div className="create-blog">
      <Navbar />

      <div className="wrapper">
      <div className="form-wrapper">
        <h2 className="form-heading">Create New Blog</h2>

        <form className="blog-form">
          <label className="form-label">
            <span>Title:</span>
            <input type="text" name="title" placeholder="Enter blog title" required />
          </label>

          <label className="form-label">
            <span>Cover Image URL:</span>
            <input type="text" name="coverImage" placeholder="Enter cover image URL" required />
          </label>

          <label className="form-label">
            <span>Content:</span>
            <textarea name="content" placeholder="Write your blog content..." required></textarea>
          </label>

          <button type="submit" className="submit-button">Submit Blog</button>
        </form>
      </div>
      </div>
    </div>
  );
}

export default CreateBlog;
