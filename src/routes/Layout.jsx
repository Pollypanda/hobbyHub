import React from 'react';
import { Outlet } from 'react-router-dom';
import '../styles/tailwind.css';
import TopNav from '../components/topNav'




const Layout = () => {
  return (
    <div className="layout">
      <TopNav />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;