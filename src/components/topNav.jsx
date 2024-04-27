import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/tailwind.css'; // Import your CSS file

const TopNav = () => (
  <div className="topNav">
    <h1 className="logo">Crochet Hub</h1>
    <ul className="navLinks">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/post-form">Create a Post</Link>
      </li> 
      <li>
        <Link to="/post-feed">Post Feed</Link> {/* Corrected route */}
      </li>
    </ul>
  </div>
);

export default TopNav;
