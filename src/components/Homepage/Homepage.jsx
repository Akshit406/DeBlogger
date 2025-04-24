import React from 'react';
import "./Homepage.css"

const Homepage = () => {
    return (
        <div className="homepage">
            <div className="header">
                <div className="headerButtons">
                <p>Home</p>
                <p>Blogs</p>
                <p>Profile</p>
                <p>About</p>
                </div>
            </div>
            <div className="center">
                <div className="backgroundImg"></div>
                <img src='../../src/assets/1572.jpg'></img>
                <div className="textwrapper">
                    <p className='title'>Welcome to DeBlogger</p>
                    <p>Decentralized Blogging, Redefined</p>
                </div>
                <div className="separator">
                    <p>your voice</p>
                    <p>your content</p>
                    <p>your rules</p>
                </div>
                <div className="content">
                    <p>DeBlogger is a decentralized, censorship-resistant blogging platform built on blockchain. Whether you're a writer, researcher, creator, or citizen journalist, deBlogger empowers you to share your ideas without fear of moderation or data loss. Unlike traditional platforms, your posts live on a trustless network — immutable, transparent, and owned entirely by you.</p>

                    <div className='midContent'>
                        <p>✍️ Own Your Words – Your blog posts are stored securely on the Ethereum Sepolia testnet, giving you full control and transparency.</p>
                        <p>🔒 No Censorship – Your content lives on a decentralized network, so no single party can take it down or modify it.</p>
                        <p>🔗 Easy Web3 Login – Sign in with MetaMask to start posting instantly—no email, no passwords, just your wallet.</p>
                        <p>🪙 Transparent Publishing – Every post is recorded on the blockchain, making your publishing history verifiable and tamper-proof.</p>
                    </div>
                </div>
            </div>
            <div className="footer">
            </div>
        </div>
    );
};

export default Homepage;
