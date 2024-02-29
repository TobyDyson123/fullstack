import Navbar from "./navbar";
import Footer from "./footer";
import { useState, useEffect } from 'react';
import './classes.css';

const Classes = () => {
    const [classes, setClasses] = useState([]);
  
    useEffect(() => {
      const fetchClasses = async () => {
        try {
          const response = await fetch('/api/classes');
          const data = await response.json();
          setClasses(data);
        } catch (error) {
          console.error('Error fetching classes:', error);
        }
      };
  
      fetchClasses();
    }, []);

    return (
      <div className="Classes">
        <Navbar />
        <div className="classes-container">
          <h1>Available Classes</h1>
          <div className="cards-container">
            {classes.map(Class => (
              <div key={Class.classID} className="card">
                <h2>{Class.title}</h2>
                <p><strong>Date: </strong>{Class.date}</p>
                <p><strong>Time: </strong>{Class.time}</p>
                <p><strong>Duration: </strong>{Class.duration}</p>
                <p><strong>Lead by: </strong>{Class.instructor}</p>
                <p><strong>Capacity: </strong>{Class.capacity}</p>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  };
  
export default Classes;