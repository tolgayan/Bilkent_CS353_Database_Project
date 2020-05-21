mysql = require('mysql');

/*
 * Create database connection
 */
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    //password: 'naruto1212',
    database: 'scouting_db'
});

/*
 * Connect database
 */
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("MySQL is connected...");
});


let sql = 'CREATE DATABASE IF NOT EXISTS scouting_db';
db.query(sql, (err, result) => {
    if(err)
    throw err;
console.log(result);
});


module.exports = db;