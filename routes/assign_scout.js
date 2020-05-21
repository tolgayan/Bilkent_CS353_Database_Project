const express = require("express");
const router = express.Router();
const db = require('../public/javascripts/db');

router.get("/", function (req, res) {

    db.query("SELECT * FROM scout, agency WHERE agency.id='10' AND agency.id=agency_id",
              function (err, result) {

              if (err) throw err;
              res.render("assign_scout", { result: result});
    });
});

router.get("/:id", function (req, res) {

    db.query(`SELECT * FROM scout, agency, assignment WHERE agency_id='10' \
              AND scout.agency_id=agency_id AND (scout.is_available = 'available' \
              OR (assignment.scout_id=scout.scout_id AND assignment.task_id='${req.params.id}')) \
              GROUP BY scout.scout_id`,
        function (err, result) {

            if (err) throw err;
            res.render("assign_scout", { result: result});
        });
    console.log("GET:" + JSON.stringify(req.params));
});

router.post("/", function (req, res) {

    console.log("POST---" + JSON.stringify(req.params));
    res.redirect("/:id");
});

router.post("/:id", function (req, res) {
    if (req.body.button == "Assigned"){
        db.query(`DELETE FROM assignment WHERE scout_id='${req.body.scout_id}'`,
                  `UPDATE scout SET is_available=true WHERE scout_id='${req.body.scout_id}'`,
            function (err, result) {
                if (err) throw err;
            });
    }
    if (req.body.button == "Assign"){
        db.query(`INSERT INTO assignment VALUES('${req.body.scout_id}', '${req.params.id}')`,
            `UPDATE scout SET is_available=true WHERE scout_id='${req.body.scout_id}'`,
            function (err, result) {
                if (err) throw err;
            });
    }
});



module.exports = router;
