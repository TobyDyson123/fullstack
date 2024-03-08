import './navbar.css';
import logo from './Images/logo.png';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Update isLoggedIn state based on the token's presence
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    // Redirect to home or login page as needed
    window.location.href = '/';
  };

  return (
    <div className="Navbar">
      <nav className="navbar">
        <Link to="/" className='brand'>
          <div className='brand-icon'><img src={logo} alt='logo' /></div>
          <div className="brand-title">Brand</div>
        </Link>
        <a href="#" className="toggle-button">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </a>
        <div className="navbar-links">
          <ul>
            <li><a href="#">Announcements</a></li>
            <li><Link to="/instructors">Instructors</Link></li>
            <li><Link to="/classes">Classes</Link></li>
            {isLoggedIn ? (
              <>
                <li><Link className="major-button" to="/manage-bookings">Manage Bookings</Link></li>
                <li>
                  <button onClick={handleLogout} className="logout-button">
                    <i className="fas fa-sign-out-alt"></i>
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link className="minor-button" to="/login">Login</Link></li>
                <li><Link className="major-button" to="/signup">Sign Up</Link></li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
