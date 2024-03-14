import Navbar from './navbar';
import Footer from './footer';
import './Announcements.css'; 

const Announcements = () => {

  return (
    <div className="Class">
      <Navbar />
      <div className="class-container">
      <div className="return-to-classes-btn">
      </div>
        <h1>Announcements</h1>
        <div className='class-info-container'>
          <div className='class-details-wrapper'>
            <h2>Title</h2>
            <p>This is a description of the announcement</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Announcements;
