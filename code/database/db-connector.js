/*
  Citation for the following JavaScript file:
  Date: 05/30/2023
  Adapted from: db-connector.js
  Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
*/
// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_sedhomm',
  password        : '4172',
  database        : 'cs340_sedhomm'
})

// Export it for use in our applicaiton
module.exports.pool = pool;