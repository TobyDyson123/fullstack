import './navbar.css';
import logo from './Images/logo.png';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isActive, setIsActive] = useState(false); // State to manage the active class for responsiveness

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

  const toggleActive = () => {
    console.log('Current state before toggling:', isActive);
    setIsActive(!isActive);
  };

  return (
    <div className="Navbar">
      {/* <nav className="navbar">
        <Link to="/" className='brand'>
          <div className='brand-icon'><img src={logo} alt='logo' /></div>
          <div className="brand-title">Brand</div>
        </Link>
        <div className="toggle-button">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        <div className="navbar-links">
          <ul>
            <li><Link to="/announcements">Announcements</Link></li>
            <li><Link to="/instructors">Instructors</Link></li>
            <li><Link to="/classes">Classes</Link></li>
            {isLoggedIn ? (
              <>
                <li><Link className="major-button" to="/bookings">Manage Bookings</Link></li>
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
      </nav> */}
      <div className={isActive ? "topnav responsive" : "topnav"} id="myTopnav">
        <div className='brand'>
          <Link to="/">
            <div className='brand-icon'><img src={logo} alt='logo' /> Brand</div>
          </Link>
        </div>
        <div className='links'>
          <Link to="/announcements">Announcements</Link>
          <Link to="/instructors">Instructors</Link>
          <Link to="/classes">Classes</Link>
          {isLoggedIn ? (
            <>
              <Link className="major-button" to="/bookings">Manage Bookings</Link>
              <Link onClick={handleLogout} className="logout-button">
                <i className="fas fa-sign-out-alt"></i>
              </Link>
            </>
          ) : (
            <>
              <Link className="minor-button" to="/login">Login</Link>
              <Link className="major-button" to="/signup">Sign Up</Link>
            </>
          )}
          <a href="javascript:void(0);" className="icon" onClick={toggleActive}>
            <i className="fa fa-bars"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Navbar;