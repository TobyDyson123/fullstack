import './navbar.css';
import logo from './Images/logo.png';

function Navbar() {
  return (
    <div className="Navbar">
        <nav class="navbar">
            <div className='brand'>
              <div className='brand-icon'><img src={logo} alt='logo' /></div>
              <div class="brand-title">Brand</div>
            </div>
            <a href="#" class="toggle-button">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </a>
            <div class="navbar-links">
                <ul>
                <li><a href="#">Announcements</a></li>
                <li><a href="#">Instructors</a></li>
                <li><a href="#">Classes</a></li>
                <li><a class="minor-button" href="#">Login</a></li>
                <li><a class="major-button" href="#">Sign Up</a></li>
                </ul>
            </div>
        </nav>
    </div>
  );
}
  
export default Navbar;