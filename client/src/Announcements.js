import Navbar from './navbar';
import Footer from './footer';
import './Announcements.css'; 

const Announcements = () => {

  return (
    <div className="Announcements">
      <Navbar />
      <div className="anouncements-container">
        <h1>Announcements</h1>
        <div className='announcements-info-container'>
          <div className='announcements-details-wrapper'>
            <h2>New Class Alert!</h2>
            <p>Join us for "Sunrise Salutations," our early bird yoga series, every Tuesday at 6:30 AM. Start your day with movement and mindfulness.</p>
          </div>
        </div>
        <div className='announcements-info-container'>
          <div className='announcements-details-wrapper'>
            <h2>Workshop Weekend</h2>
            <p>Dive deeper into your practice with our "Yoga Anatomy & Alignment" workshop on April 22nd. Perfect for all levels. Secure your spot now!</p>
          </div>
        </div>
        <div className='announcements-info-container'>
          <div className='announcements-details-wrapper'>
            <h2>Guest Teacher Series</h2>
            <p>This month, we're excited to welcome special guest instructor Maya Cohen, teaching "Dynamic Vinyasa Flow," on May 15th. Book in advance to join us!</p>
            </div>
        </div>
        <div className='announcements-info-container'>
          <div className='announcements-details-wrapper'>
            <h2>Retreat Announcement</h2>
            <p>Escape the ordinary with our "Ocean Serenity Yoga Retreat" in Bali from July 20-27. Limited spaces for an unforgettable experience. Register today!</p>
          </div>
        </div>
        <div className='announcements-info-container'>
          <div className='announcements-details-wrapper'>
            <h2>21-Day Challenge</h2>
            <p>Transform your body and mind with our "21 Days of Yoga" challenge starting June 1st. Sign up to receive daily guidance and support!</p>
          </div>
        </div>
        <div className='announcements-info-container'>
          <div className='announcements-details-wrapper'>
            <h2>Yoga for a Cause</h2>
            <p>Attend our charity event, "Asanas for Education," on August 10th. All proceeds go to local schools. Practice for a purpose!</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Announcements;
