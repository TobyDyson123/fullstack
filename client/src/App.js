import './App.css';
import Home from './Home';
import Instructors from './Instructors';
import Classes from './Classes';
import Class from './Class';
import Login from './Login';
import Signup from './Signup';
import Bookings from './Booking';
import {HashRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/instructors" element={<Instructors />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/class/:id" element={<Class />} />
          <Route path="/bookings" element={<Bookings />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

// https://www.youtube.com/watch?v=tIV90xQ0k6A
// https://www.youtube.com/watch?v=w3vs4a03y3I
