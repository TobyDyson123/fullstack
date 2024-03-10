import Navbar from "./navbar";
import Footer from "./footer";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './booked.css';

const Bookings = () => {

    return (
        <div className="Booked">
          <Navbar />
          <div className="bookings-container">
            <h1>You're All Set!</h1>
          </div>
          <Footer />
        </div>
    );
  };
  
export default Booked;