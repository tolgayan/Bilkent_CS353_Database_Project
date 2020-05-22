const express = require("express");
const router = express.Router();
const db = require('../public/javascripts/db');

router.get("/", function (req, res) {

    db.query("SELECT * FROM scout, scout_agency WHERE scout_agency.user_id='1' AND scout_agency.user_id=agency_id",
              function (err, result) {

              if (err) throw err;
              res.render("assign_scout", { result: result});
    });
});

router.get("/:id", function (req, res) {

    db.query(`SELECT * FROM scout, scout_agency, assignment WHERE agency_id=1 \
              AND scout.agency_id=scout_agency.user_id AND (scout.is_available = 1 \
              OR (assignment.scout_id=scout.user_id AND assignment.task_id=${req.params.id})) \
              GROUP BY scout.user_id`,
        function (err, result) {

            if (err) throw err;
            res.render("assign_scout", { result: result});
        });
    console.log("GET:" + JSON.stringify(req.params));
});

router.post("/", function (req, res) {
    res.redirect("/:id");
});

router.post("/:id", function (req, res) {
    console.log("post:" + JSON.stringify(req.body));
    if (req.body.button == "Assigned"){
        db.query(`DELETE FROM assignment WHERE scout_id=${req.body.scout_id}`,
            function (err, result) {
                if (err) throw err;
            });
        db.query(`UPDATE scout SET is_available=1 WHERE user_id=${req.body.scout_id}`,
            function (err, result) {
                if (err) throw err;
            });
        res.redirect('/assign_scout/'+ req.params.id);
    }
    if (req.body.button == "Assign"){
        db.query(`INSERT INTO assignment VALUES(${req.body.scout_id}, ${req.params.id})`,
            function (err, result) {
                if (err) throw err;
            });
        db.query(`UPDATE scout SET is_available=0 WHERE scout_id=${req.body.scout_id}`,
            function (err, result) {
                if (err) throw err;
            });
        res.redirect('/assign_scout/'+ req.params.id);
    }
});



module.exports = router;
