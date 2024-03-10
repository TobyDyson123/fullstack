const express = require('express');
const connection = require('./database.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

const saltRounds = 10;
const JWT_SECRET = 'jwtpassword123';

app.use(express.json());

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN_HERE

  if (token == null) return res.sendStatus(401); // No token was provided

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Token was invalid
    req.user = user;
    next();
  });
};

// Fetch instructors
app.get('/api/instructors', (req, res) => {
    let sql = 'SELECT * FROM Instructor';
    connection.query(sql, (error, results) => {
        if (error) {
            console.log('Error fetching users', error);
        } else {
            res.send(results);
        }
    });
});

// Fetch classes
app.get('/api/classes', (req, res) => {
    let sql = "SELECT Class.classID, Class.title, Class.time, Class.date, Class.duration, Class.capacity, CONCAT(Instructor.firstname, ' ', Instructor.surname) AS instructor FROM  Class JOIN  Instructor ON Class.instructorID = Instructor.instructorID ORDER BY Class.date, Class.time ASC;";
    connection.query(sql, (error, results) => {
        if (error) {
            console.log('Error fetching classes', error);
        } else {
            res.send(results);
        }
    });
});

// Fetch class details
app.get('/api/classes/:id', (req, res) => {
    const { id } = req.params;
    let sql = "SELECT Class.classID, Class.title, Class.time, Class.date, Class.duration, Class.capacity, CONCAT(Instructor.firstname, ' ', Instructor.surname) AS instructor, Instructor.photo FROM Class JOIN Instructor ON Class.instructorID = Instructor.instructorID WHERE Class.classID = ?;";
    
    connection.query(sql, [id], (error, results) => {
        if (error) {
            console.error('Error fetching class details', error);
            res.status(500).send('Error fetching class details');
        } else {
            res.json(results[0] || {});
        }
    });
});

// Login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
  
    const query = 'SELECT * FROM Customer WHERE username = ?';
  
    connection.query(query, [username], async (error, results) => {
      if (error) {
        return res.status(500).json({ message: 'Error occurred' });
      }
  
      if (results.length > 0) {
        const user = results[0];
  
        // Compare hashed password
        const match = await bcrypt.compare(password, user.password);
  
        if (match) {
          // Create JWT token
          const token = jwt.sign({ userId: user.customerID }, JWT_SECRET, { expiresIn: '1h' });
  
          res.json({ success: true, token });
        } else {
          res.status(401).json({ success: false, message: 'Authentication failed' });
        }
      } else {
        res.status(404).json({ success: false, message: 'User not found' });
      }
    });
});

// Signup
app.post('/api/signup', async (req, res) => {
    const { username, password } = req.body;
  
    // Simple validation
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
  
    try {
      // Check if the user already exists
      const userCheckQuery = 'SELECT * FROM Customer WHERE username = ?';
      connection.query(userCheckQuery, [username], async (error, results) => {
        if (error) {
          console.error('Database error:', error);
          return res.status(500).json({ message: 'Error checking user existence' });
        }
  
        if (results.length > 0) {
          return res.status(409).json({ message: 'Username is already taken' });
        }
  
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);
  
        // Store the new user
        const insertQuery = 'INSERT INTO Customer (username, password) VALUES (?, ?)';
        connection.query(insertQuery, [username, hashedPassword], (error, results) => {
          if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ message: 'Error registering new user' });
          }
          res.status(201).json({ success: true, message: 'User registered successfully' });
        });
      });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ message: 'Error processing your signup' });
    }
});

// Fetch Bookings
app.get('/api/bookings', (req, res) => {
  let sql = "SELECT Class.classID, Class.title, Class.time, Class.date, Class.duration, Class.capacity, CONCAT(Instructor.firstname, ' ', Instructor.surname) AS instructor FROM Class JOIN Instructor ON Class.instructorID = Instructor.instructorID JOIN Booking ON Class.classID = Booking.classID JOIN Customer ON Booking.customerID = Customer.customerID WHERE Booking.customerID = 1 ORDER BY Class.date, Class.time ASC;";
  connection.query(sql, (error, results) => {
      if (error) {
          console.log('Error fetching classes', error);
      } else {
          res.send(results);
      }
  });
});

// Delete Booking
app.delete('/api/cancel-booking/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const customerID = req.user.userId;

  const query = 'DELETE FROM Booking WHERE classID = ? AND customerID = ?';

  connection.query(query, [id, customerID], (error, results) => {
      if (error) {
          console.error('Error cancelling booking:', error);
          return res.status(500).json({ message: 'Error cancelling booking' });
      }
      if (results.affectedRows === 0) {
          return res.status(404).json({ message: 'Booking not found or you do not have permission to cancel this booking' });
      }
      res.status(200).json({ message: 'Booking cancelled successfully' });
  });
});

// Add new booking
app.post('/api/book-class/:id', authenticateToken, async (req, res) => {
  const classId = req.params.id;
  const userId = req.user.userId;

  const query = 'INSERT INTO Booking (classID, customerID) VALUES (?, ?)';
  
  connection.query(query, [classId, userId], (error, results) => {
    if (error) {
      console.error('Error creating booking:', error);
      return res.status(500).json({ message: 'Error creating booking' });
    }
    res.status(201).json({ message: 'Booking created successfully' });
  });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
    connection.connect((err) => {
        if (err) {
            console.log('Error connecting to database', err);
        } else {
            console.log('Connected to database');
        }
    });
});