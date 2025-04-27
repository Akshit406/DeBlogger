import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ethers } from 'ethers';
import DeBlogABI from '../../contracts/DeBlog.json';
import Navbar from '../Navbar/Navbar';
import "./ViewBlog.css"

const DEBLOG_CONTRACT_ADDRESS = "0xbdD67AB5c812209111381EcC9B58481C7809c8f5";

const ViewBlog = () => {
  const { postId } = useParams(); // 👈 get postId from URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        if (!window.ethereum) {
          alert("Please install MetaMask!");
          return;
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const deBlogContract = new ethers.Contract(DEBLOG_CONTRACT_ADDRESS, DeBlogABI, signer);

        const fetchedBlog = await deBlogContract.allPosts(postId);
        console.log("Fetched blog:", fetchedBlog);

        setBlog(fetchedBlog);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [postId]);

  if (loading) {
    return <div>Loading blog...</div>;
  }

  if (!blog) {
    return <div>Blog not found!</div>;
  }

  return (
    <div className='viewBlog'>
      <Navbar />
      <div className="wrapper">
        <div className="blogDetails">
            <img src={blog.coverImage || "https://via.placeholder.com/400x200?text=No+Image"} alt="cover" />
            <h1>{blog.title}</h1>
            <p><strong>Author:</strong> {blog.author}</p>
            <p><strong>Published:</strong> {new Date(blog.timestamp * 1000).toLocaleDateString()}</p>
            <p><strong>Likes:</strong> ❤️ {blog.likes.toString()}</p>
            <div className="blogContent">{blog.content}</div>
        </div>
      </div>
    </div>
  );
};

export default ViewBlog;
