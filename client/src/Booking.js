import Navbar from "./navbar";
import Footer from "./footer";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './booking.css';
import SkeletonLoader from './skeleton';

const Bookings = () => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await fetch('/api/bookings');
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
        try {
            await fetch(`/api/cancel-booking/${classId}`, { method: 'DELETE' });
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

    if (loading) {
        return Array.from({ length: 9 }).map((_, index) => <SkeletonLoader key={index} />);
    }

    return (
      <div className="Bookings">
        <Navbar />
        <div className="bookings-container">
          <h1>Your Bookings</h1>
          <div className="cards-container">
          {classes.length > 0 ? (
                classes.map(Class => (
                    <div key={Class.classID} className="card">
                        <h2>{Class.title}</h2>
                        <p><strong>Date: </strong>{formatDate(Class.date)}</p>
                        <p><strong>Time: </strong>{formatTime(Class.time)}</p>
                        <p><strong>Duration: </strong>{formatDuration(Class.duration)}</p>
                        <p><strong>Lead by: </strong>{Class.instructor}</p>
                        <p><strong>Capacity: </strong>{Class.capacity}</p>
                        <span onClick={() => cancelBooking(Class.classID)} id="cancel">Cancel</span>
                    </div>
                ))
            ) : (
                <div>
                    <p>You have no bookings. Start booking your classes now!</p>
                    <Link to="/classes" className="book-class-link">Book a Class</Link>
                </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    );
  };
  
export default Bookings;