import Navbar from "./navbar";
import Footer from "./footer";
import { useState } from 'react';
import './login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
  
        const data = await response.json();
  
        if (data.success) {
          // Handle login success, redirect or store JWT token etc.
          console.log('Login successful');
        } else {
          setError(data.message || 'Login failed');
        }
      } catch (error) {
        setError('Login failed with an error.');
      }
    };
  
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button type="submit">Log In</button>
        </form>
        {error && <p>{error}</p>}
      </div>
    );
  };
  
  export default Login;