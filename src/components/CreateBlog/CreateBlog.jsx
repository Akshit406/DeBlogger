import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Createblog.css';
import { ethers } from 'ethers';
import DeBlogABI from "../../contracts/DeBlog.json";

const DEBLOG_CONTRACT_ADDRESS = "0xbdD67AB5c812209111381EcC9B58481C7809c8f5";

const CreateBlog = () => {

  const [title, setTitle] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCreateBlog = async(e)=>{
    e.preventDefault();
    setLoading(true);

    try{
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(DEBLOG_CONTRACT_ADDRESS, DeBlogABI, signer);
      const tx = await contract.createBlogPost(title,content,coverImage);
      await tx.wait();

      alert("Blog Created Successfully!");

      // Reset form after success
      setTitle('');
      setCoverImage('');
      setContent('');
    }catch(error){
      console.error("Create Blog failed:", error);
      alert("Failed to create blog. See console for error.");
    }finally{
      setLoading(false);
    }


  }
  return (
    <div className="create-blog">
      <Navbar />

      <div className="wrapper">
        <div className="form-wrapper">
          <h2 className="form-heading">Create New Blog</h2>

          <form className="blog-form">
            <label className="form-label">
              <span>Title:</span>
              <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}} placeholder="Enter blog title" required />
            </label>

            <label className="form-label">
              <span>Cover Image URL:</span>
              <input type="text" value={coverImage} onChange={(e)=>{setCoverImage(e.target.value)}} placeholder="Enter cover image URL" required />
            </label>

            <label className="form-label">
              <span>Content:</span>
              <textarea value={content}  onChange={(e)=>{setContent(e.target.value)}} placeholder="Write your blog content..." required></textarea>
            </label>

            <button type="submit" className="submit-button" onClick={handleCreateBlog}> {loading ? "Submitting..." : "Submit Blog"}</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateBlog;
