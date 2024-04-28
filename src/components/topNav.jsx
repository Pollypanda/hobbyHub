import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/tailwind.css'; // Import your CSS file

const TopNav = () => (
  <div className="topNav">
    <h1 className="logo">Crochet Hub</h1>
    <ul className="navLinks">
    
      <li>
        <Link to="/post-feed">Home</Link> {/* Corrected route */}
      </li>

      <li>
        <Link to="/post-form">Create New Post</Link>
      </li> 
    </ul>
  </div>
);

export default TopNav;
