var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    database: 'agilelogin',
    user: 'root',
    password: ''
});

module.exports = connection;