import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
    <div className="class-detail">
      <h1>{classDetails.title}</h1>
      {/* Display other details */}
    </div>
  );
};

export default Class;
