mysql = require('mysql');

/*
let sql = 'CREATE DATABASE scouting_db';
db.query(sql, (err, result) => {
    if(err)
      throw err;
    console.log(result);
});
 */

/**
 * Create database connection
 */
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    //password: 'naruto1212',
    database: 'scouting_db'
});

function connectDatabase() {
    /**
     * Connect database
     */
    db.connect((err) => {
        if (err) {
            throw err;
        }
        console.log("MySQL is connected...");
    })
}
function dbQuery(stmt, callback){
    let sql = stmt;
    let res;
    db.query(sql, (err, result) => {
        if(err)
            throw err;
        if(result.length > 0){
            res = result[0].id;
            console.log(res);
        }
        else
            res = -1;
        callback(res);
    });
}

function query2(stmt, values){
    let result = db.query(stmt, values, (err, result) =>{
        if(err)
            throw err;
    })
    return result;
}

connectDatabase();
module.exports = db;