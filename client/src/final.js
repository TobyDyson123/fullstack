import './final.css';
import { Link } from 'react-router-dom';

function Final() {
    return (
      <div className="Final">
          <div className='content'>
                <h1>What are you waiting for?</h1>
                <p>Not a member? Register today for free and begin your journey towards physical health, mental clarity, and spiritual growth!</p>
                <Link to="/signup">Register</Link>
          </div>
      </div>
    );
  }
  
  export default Final;