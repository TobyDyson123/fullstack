import './hero.css';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="Hero">
        <div className='content'>
            <h1 className='title'>Welcome to Brand!</h1>
            <h2 className='subtitle'>We offer fun and interactive classes lead by trained professionals.</h2>
            <Link to="/classes">View Classes</Link>
        </div>
    </div>
  );
}

export default Hero;