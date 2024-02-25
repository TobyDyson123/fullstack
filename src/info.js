import './info.css';
import instructor from './Images/instructor.webp';

function Info() {
    return (
      <div className="Info">
          <div className='top-container'>
            <div className='top-container-text'>
                <h1>You're in Good Hands!</h1>
                <p>
                    At the heart of our platform lies our distinguished team of qualified instructors, 
                    each bringing their unique expertise, passion, and dedication to the practice of yoga.
                </p>
                <p>
                    Our instructors are not only certified through rigorous training programs, 
                    but they also embody the principles of yoga in their daily lives.
                </p>
                <a href='#'>Meet the team</a>
            </div>
            <div className='top-container-image'>
                <img src={instructor} alt='instructors' />
            </div>
          </div>
          <div className='bottom-container'>
            <h1>What We Offer</h1>
            <div className='bottom-container-cards'>
                <div className='card'>
                    <img src={instructor} alt='instructors' />
                    <p>
                        Fun, interactive classes led by trained professionals
                    </p>
                </div>
                <div className='card'>
                    <img src={instructor} alt='instructors' />
                    <p>
                        Client accounts to manage bookings and workshops
                    </p>
                </div>
                <div className='card'>
                    <img src={instructor} alt='instructors' />
                    <p>
                        Email newsletter keeping you up to date with the latest yoga news
                    </p>
                </div>
            </div>
            <a href='#'>View classes</a>
          </div>
      </div>
    );
  }
  
  export default Info;