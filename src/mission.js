import './mission.css';
import handshake from './Images/handshake.png';
import calendar from './Images/calendar.png';
import people from './Images/people.png';

function Mission() {
    return (
      <div className="Mission">
          <div className="content">
            <h1>Our Mission</h1>
            <ul className="mission-list">
              <li>
                <img src={handshake} alt="Handshake Icon" className="icon"/>
                <p>Our mission is to <strong>empower and enrich lives</strong> through the transformative power of yoga. We believe in making yoga <strong>accessible to everyone</strong>, regardless of age, experience, or background.</p>
              </li>
              <li>
                <img src={calendar} alt="Calendar Icon" className="icon"/>
                <p>Our platform <strong>simplifies the process</strong> of finding and booking yoga classes, enabling practitioners to <strong>seamlessly connect with experienced instructors</strong> through a diverse range of classes.</p>
              </li>
              <li>
                <img src={people} alt="People Icon" className="icon"/>
                <p>We are committed to fostering a <strong>supportive and inclusive community</strong> where each individual can embark on their personal journey towards physical health, mental clarity, and spiritual growth.</p>
              </li>
            </ul>
          </div>
      </div>
    );
  }
  
  export default Mission;