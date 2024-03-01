const express = require('express');
const connection = require('./database.js');
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
    // Fetch class details from the database and respond
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