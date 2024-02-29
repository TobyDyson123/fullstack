import Navbar from "./navbar";
import Footer from "./footer";
import { useState, useEffect } from 'react';
import './instructors.css';

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

  return (
    <div className="Instructors">
      <Navbar />
      <div className="instructors-container">
        <h1>Meet the team</h1>
        <div className="cards-container">
          {instructors.map(instructor => (
            <div key={instructor.instructorID} className="card">
              <h2>{instructor.firstname} {instructor.surname}</h2>
              <img src={instructor.photo} alt={instructor.firstname} />
              <p>Start Date: {instructor.startDate}</p>
              <p>{instructor.bio}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Instructors;
