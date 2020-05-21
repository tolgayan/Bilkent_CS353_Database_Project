const express = require('express');
const router = express.Router();
const db = require("../public/javascripts/db");

/* GET home page. */
let users;
router.get('/', function(req, res, next) {
    cl(res, func);
});

function cl(res, callback) {
    db.query("SELECT * FROM task, assignment WHERE task.id=assignment.task_id AND scout_id=1 ORDER BY assigned_date", (err, result) => {
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
    res.render('../views/taskoffer.ejs', { result: users });
}

module.exports = router;