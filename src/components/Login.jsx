import React, { useState } from 'react';
import axios from 'axios';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('https://task-master-qz24.onrender.com/api/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', response.data.token);
      window.location.href = '/taskForm'; 
    } catch (error) {
      setErrorMessage('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
};

export default Login;
