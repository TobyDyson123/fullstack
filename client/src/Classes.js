import Navbar from "./navbar";
import Footer from "./footer";
import { useState, useEffect } from 'react';
import './classes.css';
import { useNavigate } from 'react-router-dom';

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

    const navigate = useNavigate();
    const handleCardClick = (classID) => {
      console.log("Navigating to class with ID:", classID);
      navigate(`/class/${classID}`);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
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

    const daysUntilClass = (classDate) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); 
        const startDate = new Date(classDate);
        startDate.setHours(0, 0, 0, 0); 
        const timeDiff = startDate - today;
        const dayDiff = timeDiff / (1000 * 60 * 60 * 24);
        return Math.max(0, Math.ceil(dayDiff));
    };
      
    const SkeletonLoader = () => {
      return (
        <div className="skeleton">
          <div className="skeleton-title"></div>
          <div className="skeleton-info"></div>
          <div className="skeleton-info"></div>
          <div className="skeleton-info"></div>
          <div className="skeleton-info"></div>
        </div>
      );
    };    

    return (
      <div className="Classes">
        <Navbar />
        <div className="classes-container">
          <h1>Available Classes</h1>
          <div className="cards-container">
          {classes.length === 0 ? (
            Array.from({ length: 9 }).map((_, index) => <SkeletonLoader key={index} />)
          ) : (
            classes.map(Class => (
              <div key={Class.classID} className="card" onClick={() => handleCardClick(Class.classID)}>
                <h2>{Class.title}</h2>
                <p><strong>Date: </strong>{formatDate(Class.date)}</p>
                <p><strong>Time: </strong>{formatTime(Class.time)}</p>
                <p><strong>Duration: </strong>{formatDuration(Class.duration)}</p>
                <p><strong>Lead by: </strong>{Class.instructor}</p>
                <p><strong>Capacity: </strong>{Class.capacity}</p>
                <span id="countdown">{daysUntilClass(Class.date)} days left!</span>
              </div>
            ))
          )}
          </div>
        </div>
        <Footer />
      </div>
    );
  };
  
export default Classes;