const express = require('express');
const router = express.Router();
const db = require("../public/javascripts/db");

db.query("CREATE VIEW IF NOT EXISTS completed_reports AS \
         SELECT image, footballer.forename, final_report.rating, final_report.comment, scout.user_id, report_id, \
         footballer.position, footballer.nationality, footballer.club_name FROM \
         images, footballer, final_report, scout WHERE final_report.report_id IN \
         (SELECT report_id FROM assignment, final_report WHERE assignment.status='complete' AND \
         final_report.user_id=assignment.user_id AND final_report.task_id=assignment.task_id AND scout.user_id=assignment.user_id) AND \
         footballer.image_id=images.id AND footballer.player_id = final_report.player_id", (err, result) => {
    if (err) {
        throw err;
        console.log("error");
    }
});

router.get('/', function(req, res, next) {
    db.query("SELECT club_name, task_id, height, weight, age, position, time, scout_num, foot,\
                salary, transfer_price, assignment.status \
                FROM task, assignment, club WHERE task.id=assignment.task_id AND \
                user_id=2 AND club.user_id=task.club_id AND task.status='uncomplete' ORDER BY assigned_date", (err, result) => {
        if (err) {
            throw err;
            console.log("error");
        }
        res.render('tasks', { result: result});
    });
});

function aFunction(req, res){
    if(req.body.status == "incomplete" ){
        console.log(" 4q3t4w");
        db.query("SELECT * FROM completed_reports WHERE user_id='1'",(err, result) => {
            if (err) {
                throw err;
                console.log("error");
            }
            console.log("THIS:" + JSON.stringify(result));
            res.render( "completed_reports", {reports: result});
        });
        return;
    }
    else if(req.body.status == "complete"){
        console.log("tjgds");
        res.redirect("../report");
        return;
    }
}


router.post('/', function (req,res) {
    console.log("ID: " + JSON.stringify(req.body));
    aFunction(req, res);
});

router.get('/posts', function(req, res, next) {
    db.query("SELECT * FROM completed_reports WHERE user_id='2'",(err, result) => {
        if (err) {
            throw err;
            console.log("error");
        }
        console.log("THIS:" + JSON.stringify(result));
        res.render( "completed_reports", {reports: result});
    });
});


module.exports = router;