import Navbar from "./navbar";
import Footer from "./footer";
import { useState } from 'react';
import './login.css';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
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
            localStorage.setItem('token', data.token); // Store the token in local storage
          console.log('Login successful');
          navigate('/'); 
        } else {
          setError(data.message || 'Login failed');
        }
      } catch (error) {
        setError('Login failed with an error.');
      }
    };
  
    return (
      <div className="Login">
        <Navbar />
        <div className="banner"></div>
        <div className="login-container">
            <div className="login-content">
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button className="btn-primary" type="submit">Submit</button>
                </form>
                <div className="signup-link">Not a member? <Link to="/signup">Sign up</Link></div>
                {error && <p style={{textAlign: "center"}}>{error}</p>}
            </div>
        </div>
        {/* <Footer /> */}
      </div>
    );
  };
  
  export default Login;