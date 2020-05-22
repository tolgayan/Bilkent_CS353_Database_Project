const express = require('express');
const router = express.Router();
const db = require("../public/javascripts/db");

db.query("CREATE VIEW IF NOT EXISTS completed_reports AS \
                        SELECT image, status, footballer.forename, assignment.task_id, \
                        final_report.rating, final_report.comment, scout.user_id, report_id, \
                        footballer.position, footballer.nationality, footballer.club_name FROM\
                        images, footballer, final_report, scout, assignment WHERE \
                        final_report.report_id AND final_report.scout_id=assignment.scout_id \
                        AND final_report.task_id=assignment.task_id AND scout.user_id=assignment.scout_id \
                        AND footballer.image_id=images.id AND assignment.status='complete' \
                        AND footballer.player_id = final_report.player_id GROUP BY report_id", (err, result) => {
    if (err) {
        throw err;
        console.log("error");
    }
});

router.get('/', function(req, res, next) {
    db.query("SELECT club_name, task.id, height_max, weight_max, age_max, position, time, scout_num, foot,\
                salary_max, transfer_price_min, assignment.status \
                FROM task, assignment, assign, club WHERE task.id=assignment.task_id AND assign.club_id=club.user_id AND assign.task_id=task.id \
                AND assignment.scout_id=4 AND task.status='uncompleted' ORDER BY assigned_date", (err, result) => {
        if (err) {
            throw err;
            console.log("error");
        }
        res.render('tasks', { result: result});
    });
});

function aFunction(req, res){
    console.log(req.body.id);
    if(req.body.status == "complete" ){
        db.query(`SELECT * FROM completed_reports WHERE user_id=4 AND task_id = ${req.body.id}`,(err, result) => {
            if (err) {
                throw err;
                console.log("error");
            }
            res.render( "completed_reports", {reports: result});
        });
        return;
    }
    else if(req.body.status == "incomplete"){
        res.redirect("../report");
        return;
    }
}


router.post('/', function (req,res) {
    console.log("ID: " + JSON.stringify(req.body));
    aFunction(req, res);
});



module.exports = router;