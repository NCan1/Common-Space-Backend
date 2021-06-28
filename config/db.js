const mysql = require("mysql");


var connection = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  port: process.env.PORTDB,
  password: process.env.PASSWORD,
  database: process.env.DB  
});

module.exports = connection;