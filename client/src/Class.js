import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './footer';
import './class.css';

const Class = () => {
  const { id } = useParams();
  const [classDetails, setClassDetails] = useState(null);

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const response = await fetch(`/api/classes/${id}`);
        const data = await response.json();
        setClassDetails(data);
      } catch (error) {
        console.error('Error fetching class details:', error);
      }
    };

    fetchClassDetails();
  }, [id]);

  if (!classDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Class">
      <Navbar />
      <h1>{classDetails.title}</h1>
      <p>{classDetails.date}</p>
      <p>{classDetails.time}</p>
      <p>{classDetails.duration}</p>
      <p>{classDetails.instructor}</p>
      <p>{classDetails.capacity}</p>
      <Footer />
    </div>
  );
};

export default Class;
