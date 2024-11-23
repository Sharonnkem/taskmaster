import React from "react";
import { Link } from "react-router-dom";
import './navbar.css';

const Navbar = () => {
  const isAuthenticated =  !!localStorage.getItem('token');

  return (
    <nav>
      <h1>TaskMaster</h1>
      <ul>
        {isAuthenticated ? (
          <>
            <li><Link to="/taskForm">Tasks</Link></li>
            <li><Link to="/taskList">Tasklist</Link></li>
            <li><button onClick={() => { localStorage.removeItem('token'); window.location.href = '/login'; }}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
