import './footer.css';
import logo from './Images/logo.png';

function Footer() {
    return (
      <div className="Footer">
            <div className='brand'>
                <div className='brand-icon'><img src={logo} alt='logo' /></div>
                <div class="brand-title">Brand</div>
            </div>
      </div>
    );
  }
  
  export default Footer;