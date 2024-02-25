import './info.css';

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
            </div>
            <div className='top-container-image'>
                <img src='' alt='instructors' />
            </div>
          </div>
          <div className='bottom-container'>
            <h1>What We Offer</h1>
          </div>
      </div>
    );
  }
  
  export default Info;