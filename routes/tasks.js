const express = require('express');
const router = express.Router();
const db = require("../public/javascripts/db");

/* GET home page. */
let users;
router.get('/', function(req, res, next) {
    cl(res, func);
});

function cl(res, callback) {
    db.query("SELECT * FROM user", (err, result) => {
        if (err) {
            throw err;
            console.log("error");
        }
        users = result;
        console.log(users);
        callback(res);
    });
}

function func(res){
    console.log(users);
    res.render('../views/scouttasks', { result: users });
}

module.exports = router;