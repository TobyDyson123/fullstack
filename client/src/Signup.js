import Navbar from "./navbar";
import Footer from "./footer";
import { useState } from 'react';
import './login.css';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
      e.preventDefault();

      // Basic front-end validation for empty fields or password mismatch
      if (!username || !password || !confirmPassword) {
        setError('Please fill in all fields.');
        return;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }

      try {
        const response = await fetch('/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (data.success) {
          console.log('Registration successful');
          navigate('/'); // Redirects the user to the homepage
        } else {
          setError(data.message || 'Registration failed');
        }
      } catch (error) {
        console.error('Registration failed with an error:', error);
        setError('Registration failed with an error.');
      }
    };

    return (
      <div className="Login">
        <Navbar />
        <div className="banner"></div>
        <div className="login-container">
            <div className="login-content">
                <h1>Sign Up</h1>
                <form onSubmit={handleSignUp}>
                    <label>
                        Username:
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </label>
                    <label>
                        Password:
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <label>
                        Confirm Password:
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </label>
                    <button className="btn-primary" type="submit">Sign Up</button>
                </form>
                <div className="signup-link">Already a member? <Link to="/login">Log in</Link></div>
                {error && <p style={{textAlign: "center"}}>{error}</p>}
            </div>
        </div>
        {/* <Footer /> */}
      </div>
    );
};

export default SignUp;
