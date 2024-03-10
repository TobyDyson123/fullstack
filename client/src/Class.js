import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './footer';
import './class.css'; 

const Class = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [classDetails, setClassDetails] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }

    const fetchClassDetails = async () => {
      try {
        const response = await fetch(`/api/classes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setClassDetails(data);
      } catch (error) {
        console.error('Error fetching class details:', error);
      }
    };

    fetchClassDetails();
  }, [id, navigate]);


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

  if (!classDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Class">
      <Navbar />
      <div className="class-container">
      <div className="return-to-classes-btn">
        <Link to="/classes">
          <i className="fas fa-arrow-left"></i> Return to Classes
        </Link>
      </div>
        <h1>Book Now</h1>
        <div className='class-info-container'>
          <div className='class-details-wrapper'>
            <h2>{classDetails.title}</h2>
            <p><strong>Date:</strong> {formatDate(classDetails.date)}</p>
            <p><strong>Time:</strong> {formatTime(classDetails.time)}</p>
            <p><strong>Duration:</strong> {formatDuration(classDetails.duration)}</p>
            <p><strong>Lead by:</strong> {classDetails.instructor}</p>
            <p><strong>Capacity:</strong> {classDetails.capacity}</p>
            <Link to="/">Book Now</Link>
          </div>
          <div className='class-image-wrapper'>
            <img src={classDetails.photo} alt={classDetails.title} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Class;
