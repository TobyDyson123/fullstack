import './navbar.css';

function Navbar() {
  return (
    <div className="Navbar">
        <nav class="navbar">
            <div class="brand-title">Brand</div>
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
                <li><a href="#">Login</a></li>
                <li><a href="#">Sign Up</a></li>
                </ul>
            </div>
        </nav>
    </div>
  );
}

export default Navbar;