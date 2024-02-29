import Navbar from "./navbar";
import Footer from "./footer";
import { useState, useEffect } from 'react';
import './instructors.css';
import { Link } from 'react-router-dom';

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await fetch('/api/instructors');
        const data = await response.json();
        setInstructors(data);
      } catch (error) {
        console.error('Error fetching instructors:', error);
      }
    };

    fetchInstructors();
  }, []);

  // Function to calculate years of experience
  const calculateExperience = (startDate) => {
    const start = new Date(startDate);
    const now = new Date();
    const years = now.getFullYear() - start.getFullYear();

    const months = now.getMonth() - start.getMonth();
    const isAnniversaryPassed = months > 0 || (months === 0 && now.getDate() >= start.getDate());
    return isAnniversaryPassed ? years : years - 1;
  };

  return (
    <div className="Instructors">
      <Navbar />
      <div className="instructors-container">
        <h1>Meet the team</h1>
        <div className="cards-container">
          {instructors.map(instructor => (
            <div key={instructor.instructorID} className="card">
              <h2>{instructor.firstname} {instructor.surname}</h2>
              <div className="image-container">
                <img src={instructor.photo} alt={`${instructor.firstname} ${instructor.surname}`} />
              </div>
              <p><strong>Experience:</strong> {calculateExperience(instructor.startDate)} years</p>
              <h3>Bio:</h3>
              <p>{instructor.bio}</p>
            </div>
          ))}
        </div>
        <Link to="/classes">View Classes</Link>
      </div>
      <Footer />
    </div>
  );
};

export default Instructors;
