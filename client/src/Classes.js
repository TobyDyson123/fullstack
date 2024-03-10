import Navbar from "./navbar";
import Footer from "./footer";
import { useState, useEffect } from 'react';
import './classes.css';
import { useNavigate } from 'react-router-dom';
import SkeletonLoader from './skeleton';

const Classes = () => {
    const [classes, setClasses] = useState([]);
    const [bookedClasses, setBookedClasses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const classesResponse = await fetch('/api/classes');
                const classesData = await classesResponse.json();

                const token = localStorage.getItem('token');
                if (token) {
                    const bookingsResponse = await fetch('/api/bookings', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    const bookingsData = await bookingsResponse.json();
                    setBookedClasses(bookingsData.map(booking => booking.classID));
                }

                setClasses(classesData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchClasses();
    }, []);

    // Filter out classes that the user has booked
    const availableClasses = classes.filter(cls => !bookedClasses.includes(cls.classID));

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

    return (
      <div className="Classes">
        <Navbar />
        <div className="classes-container">
          <h1>Available Classes</h1>
          <div className="cards-container">
          {availableClasses.length === 0 ? (
            Array.from({ length: 9 }).map((_, index) => <SkeletonLoader key={index} />)
          ) : (
            availableClasses.map(Class => (
              <div key={Class.classID} className="card" onClick={() => handleCardClick(Class.classID)}>
                <h2>{Class.title}</h2>
                <p><strong>Date: </strong>{formatDate(Class.date)}</p>
                <p><strong>Time: </strong>{formatTime(Class.time)}</p>
                <p><strong>Duration: </strong>{formatDuration(Class.duration)}</p>
                <p><strong>Lead by: </strong>{Class.instructor}</p>
                <p><strong>Capacity: </strong>{Class.capacity}</p>
                <p><strong>Location: </strong>{Class.location}</p>
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