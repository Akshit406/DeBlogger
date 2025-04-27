import React, { useEffect, useState } from 'react'
import './BlogsPage.css'
import Navbar from '../Navbar/Navbar'
import { ethers } from 'ethers'
import DeBlogProfileABI from '../../contracts/DeBlogProfile.json';
import DeBlogABI from '../../contracts/DeBlog.json';
import { Link } from 'react-router-dom';

const DEBLOG_CONTRACT_ADDRESS = "0xbdD67AB5c812209111381EcC9B58481C7809c8f5";
const PROFILE_CONTRACT_ADDRESS = "0xdE80E7d6370457175D5Ae1B65aD051f9021Effc4";

const BlogsPage = () => {
  const [blogs, setBlogs]=useState([]);
  const [loading, setLoading] = useState(false);

  

  useEffect(()=>{
    const loadblogs = async()=>{
      try{
        if(!window.ethereum){
          alert("Please install metamask!")
          return;
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);

        const signer = provider.getSigner();
        const deBlogContract = new ethers.Contract(DEBLOG_CONTRACT_ADDRESS, DeBlogABI, signer);
        const profileContract = new ethers.Contract(PROFILE_CONTRACT_ADDRESS,DeBlogProfileABI, signer);

        const fetchedBlogs = await deBlogContract.getAllPosts();
        console.log("Fetched blogs:", fetchedBlogs);

        setBlogs(fetchedBlogs);

        // For each blog, get the author's username
        const blogsWithUsernames = await Promise.all(
          fetchedBlogs.map(async (blog) => {
            try {
              const profile = await profileContract.getProfile(blog.author);
              return {
                ...blog,
                username: profile.username || "Unknown Author",
              };
            } catch (error) {
              console.error(`Failed to fetch profile for ${blog.author}:`, error);
              return {
                ...blog,
                username: "Unknown Author",
              };
            }
          })
        );

        setBlogs(blogsWithUsernames);
        
      }catch (error) {
        console.error("Error loading blogs:", error);
      } finally {
        setLoading(false);
      }
    }
    loadblogs();
  }, []);

  
  return (
    <div className='blogsPage'>
      <Navbar />
      <div className="blogs">
      <p>Sorting blogs by postID</p>

        {loading? (
          <p>Loading blogs from blockchain...</p>
        ): blogs.length === 0 ? (
          <p>No Blogs yet. Be the first to create one!</p>
        ):(
          blogs.map((blog)=> (
            <Link to={`/blog/${blog.postId}` } key={blog.postId} className='blogLink'>
              <div key={blog.postId} className="blog">
                <img src={blog.coverImage || "https://via.placeholder.com/400x200?text=No+Image"} alt="" />
                <p className="blogTitle">{blog.title}</p>
                <p className="authorName">Author: {blog.username}</p> 
                <p className="publishedAt">Published: {new Date(blog.timestamp * 1000).toLocaleDateString()}</p>
                <p className='blogLikes'>❤️ {blog.likes.toString()} likes</p>
              </div>
            </Link>
          ))
        )}
       
        
      </div>
    </div>
  )
}

export default BlogsPage
