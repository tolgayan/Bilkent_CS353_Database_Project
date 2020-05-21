const express = require('express');
const router = express.Router();
const db = require("../public/javascripts/db");

let report;
db.query("CREATE VIEW IF NOT EXISTS uncompleted_reports AS \
         SELECT image, footballer.forename, scout.scout_id, final_report.rating, final_report.comment, report_id, \
         footballer.position, footballer.nationality, footballer.club_name FROM \
         images, footballer, final_report, scout WHERE final_report.report_id IN \
         (SELECT report_id FROM assignment, task, final_report WHERE task.status='uncomplete' AND \
         final_report.scout_id=assignment.scout_id AND final_report.task_id=assignment.task_id AND task.id=final_report.task_id) AND \
        footballer.image_id=images.id AND footballer.player_id = final_report.player_id AND scout.scout_id=final_report.scout_id", (err, result) => {
    if (err) {
        throw err;
        console.log("error");
    }
});

function rend(res){
    console.log(report);
    res.render( '../views/report', {reports: report});
}

function sql(res, callback){
    db.query(`SELECT * FROM uncompleted_reports WHERE scout_id =${1}`, (err, result) => {
        if (err) {
            throw err;
            console.log("error");
        }
        console.log(result);
        report = result;
        callback(res);
    });

}

function update_delete(query, res){
    db.query(query, (err, result) => {
        if (err) {
            throw err;
            console.log("error");
        }
        console.log(result);
        sql(res,  rend);
    });

}



/* GET home page. */
router.get('/', function(req, res, next) {
    sql(res,  rend);
});

router.post('/', function (req, resp) {
   let edit = req.body.edit;
   console.log(req.body);
   console.log(edit);
   if (edit == "true"){
       console.log(true);
       update_delete(`UPDATE final_report SET comment='${req.body.text}', rating='${req.body.rating}' \
        WHERE report_id=${req.body.id}`, resp);
   }
   else{
       console.log(false);
       update_delete(`DELETE FROM final_report WHERE report_id=${req.body.report_id}`);
   }

});


module.exports = router;