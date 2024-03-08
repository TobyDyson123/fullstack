import './navbar.css';
import logo from './Images/logo.png';
import {Link} from 'react-router-dom';

function Navbar() {
  return (
    <div className="Navbar">
        <nav class="navbar">
            <Link to="/" className='brand'>
              <div className='brand-icon'><img src={logo} alt='logo' /></div>
              <div class="brand-title">Brand</div>
            </Link>
            <a href="#" class="toggle-button">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </a>
            <div class="navbar-links">
                <ul>
                <li><a href="#">Announcements</a></li>
                <li><Link to="/instructors">Instructors</Link></li>
                <li><Link to="/classes">Classes</Link></li>
                <li><Link class="minor-button" to="/login">Login</Link></li>
                <li><Link class="major-button" to="/signup">Sign Up</Link></li>
                </ul>
            </div>
        </nav>
    </div>
  );
}
  
export default Navbar;