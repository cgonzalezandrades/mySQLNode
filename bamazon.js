// Creating an instance of 'mysql' node package to be used by bamazonCustomer.js and bamazonManager.js
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bamazon'
});




// Exporting the file.
module.exports = connection;