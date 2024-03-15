import Navbar from "./navbar";
import Footer from "./footer";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './booking.css';
import SkeletonLoader from './skeleton';
import useScrollToTop from "./scrollToTop";

const Bookings = () => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClasses = async () => {
            const token = localStorage.getItem('token'); // Retrieve the token from localStorage
        
            try {
                const response = await fetch('/api/bookings', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setClasses(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching classes:', error);
                setLoading(false);
            }
        };

        fetchClasses();
    }, []);

    const cancelBooking = async (classId) => {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    
        try {
            await fetch(`/api/cancel-booking/${classId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setClasses(classes.filter(Class => Class.classID !== classId));
        } catch (error) {
            console.error('Error cancelling booking:', error);
        }
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
    
    useScrollToTop();

    if (loading) {
        return (
        <div className="Bookings">
            <Navbar />
            <div className="bookings-container">
                <h1>Your Bookings</h1>
                <div className="cards-container">
                    {Array.from({ length: 9 }).map((_, index) => <SkeletonLoader key={index} />)};
                </div>
            </div>
            <Footer />
        </div>
        );
    }

    return (
        <div className="Bookings">
          <Navbar />
          <div className="bookings-container">
            <h1>Your Bookings</h1>
            {classes.length > 0 ? (
              <div className="cards-container">
                {classes.map(Class => (
                  <div key={Class.classID} className="card">
                    <h2>{Class.title}</h2>
                    <p><strong>Date: </strong>{formatDate(Class.date)}</p>
                    <p><strong>Time: </strong>{formatTime(Class.time)}</p>
                    <p><strong>Duration: </strong>{formatDuration(Class.duration)}</p>
                    <p><strong>Lead by: </strong>{Class.instructor}</p>
                    <p><strong>Capacity: </strong>{Class.capacity}</p>
                    <p><strong>Location: </strong>{Class.location}</p>
                    <span onClick={() => cancelBooking(Class.classID)} id="cancel">Cancel</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-bookings-message">
                <h2>It looks like you have no bookings...</h2>
                <p>You have no bookings. Start booking your classes now!</p>
                <Link to="/classes" className="book-class-link">Book a Class</Link>
              </div>
            )}
          </div>
          <Footer />
        </div>
    );
  };
  
export default Bookings;