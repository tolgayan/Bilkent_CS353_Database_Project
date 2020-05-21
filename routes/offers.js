const express = require('express');
const router = express.Router();
const db = require("../public/javascripts/db");

router.post('/', function(req, res, next) {
    console.log(JSON.stringify(req.body));
});

router.get('/', function(req, res, next) {
    db.query("SELECT * FROM task, assign,club WHERE task.id=assign.task_id AND agency_id=10 AND club.id=assign.club_id ORDER BY assigned_date", (err, result) => {
        if (err) {
            throw err;
            console.log("error");
        }
        res.render('../views/taskoffer.ejs', { result: result });
    });
});

module.exports = router;