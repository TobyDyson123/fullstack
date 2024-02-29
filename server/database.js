var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    database: 'fullstack',
    user: 'root',
    password: ''
});

module.exports = connection;