const express = require('express');
const connection = require('./database.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

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

app.get('/api/classes/:id', (req, res) => {
    const { id } = req.params;
    let sql = "SELECT Class.classID, Class.title, Class.time, Class.date, Class.duration, Class.capacity, CONCAT(Instructor.firstname, ' ', Instructor.surname) AS instructor, Instructor.photo FROM Class JOIN Instructor ON Class.instructorID = Instructor.instructorID WHERE Class.classID = ?;";
    
    connection.query(sql, [id], (error, results) => {
        if (error) {
            console.error('Error fetching class details', error);
            res.status(500).send('Error fetching class details');
        } else {
            // Assuming you're expecting one class back, you might want to just send the first result
            res.json(results[0] || {});
        }
    });
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
  
    const query = 'SELECT * FROM users WHERE username = ?';
  
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
          const token = jwt.sign({ userId: user.id }, 'YOUR_SECRET_KEY', { expiresIn: '1h' });
  
          res.json({ success: true, token });
        } else {
          res.status(401).json({ success: false, message: 'Authentication failed' });
        }
      } else {
        res.status(404).json({ success: false, message: 'User not found' });
      }
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