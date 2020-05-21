const express = require('express');
const router = express.Router();
const db = require("../public/javascripts/db");

router.post('/', function(req, res, next) {
    if (req.body.button == "Accept"){
        db.query("UPDATE assign SET assign.status = 'accepted'", (err, result) => {
            if (err) {
                throw err;
                console.log("error");
            }
            db.query("  SELECT * FROM task, assign,club WHERE \
                        task.id=assign.task_id AND \
                        agency_id=10 AND club.id=assign.club_id AND \
                        task.status = 'uncomplete' ORDER BY \
                        assigned_date", (err, result) => {
                if (err) {
                    throw err;
                    console.log("error");
                }
                res.render('../views/taskoffer.ejs', { result: result });
            });
        });
    }
    else if(req.body.button == "Decline"){
        db.query("  UPDATE assign SET assign.status='noagency'\
                    WHERE assign.task_id='${req.body.task_id}'",
                    "UPDATE task SET task.agency_id=null \
                    WHERE agency_id = 10", (err, result) => {
            if (err) {
                throw err;
                console.log("error");
            }
            res.render('../views/taskoffer.ejs', { result: result });
        });
    }
    else if (req.body.button == "Manage"){
        res.redirect("/assign_scout/" + req.body.task_id);
    }

});

router.get('/', function(req, res, next) {
    db.query("SELECT * FROM task, assign,club WHERE\
              task.id=assign.task_id AND \
              agency_id=10 AND club.id=assign.club_id \
              AND task.status = 'uncomplete' ORDER BY \
              assigned_date", (err, result) => {
        if (err) {
            throw err;
            console.log("error");
        }
        res.render('../views/taskoffer.ejs', { result: result });
    });
});

module.exports = router;