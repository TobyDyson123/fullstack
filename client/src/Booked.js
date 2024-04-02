import Navbar from "./navbar";
import Footer from "./footer";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './booked.css';
import useScrollToTop from "./scrollToTop";

const Booked = () => {

  useScrollToTop();
    return (
        <div className="Booked">
          <Navbar />
          <div className="booked-container">
            <h1>You're All Set!</h1>
            {/* <h2>Booking Confirmation:</h2> */}
            <p>Thank you for booking with us, we look forward to welcoming you!</p>
            {/* Class details go here */}
            <div className="links-container">
                <Link className="major" to="/classes">Book Another Class</Link>
                <Link className="minor" to="/bookings">View Bookings</Link>
            </div>
          </div>
          <Footer />
        </div>
    );
  };
  
export default Booked;