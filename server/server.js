const express = require('express');
const connection = require('./database.js');
const app = express();

app.get('/api', (req, res) => {
    let sql = 'SELECT * FROM users';
    connection.query(sql, (error, results) => {
        if (error) {
            console.log('Error fetching users', error);
        } else {
            res.send(results);
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