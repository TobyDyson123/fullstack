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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() is zero-indexed
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        return `${hours}:${minutes}`;
    };

    const formatDuration = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
      
        if (hours === 0) {
          return `${minutes} minutes`;
        } else if (minutes === 0) {
          return `${hours} hour${hours > 1 ? 's' : ''}`;
        } else {
          return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minutes`;
        }
    };

    return (
      <div className="Classes">
        <Navbar />
        <div className="classes-container">
          <h1>Available Classes</h1>
          <div className="cards-container">
            {classes.map(Class => (
              <div key={Class.classID} className="card">
                <h2>{Class.title}</h2>
                <p><strong>Date: </strong>{formatDate(Class.date)}</p>
                <p><strong>Time: </strong>{formatTime(Class.time)}</p>
                <p><strong>Duration: </strong>{formatDuration(Class.duration)}</p>
                <p><strong>Lead by: </strong>{Class.instructor}</p>
                <p><strong>Capacity: </strong>{Class.capacity}</p>
                <span className="countdown"></span>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  };
  
export default Classes;