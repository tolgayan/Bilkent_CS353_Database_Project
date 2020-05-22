const express = require('express');
const router = express.Router();
const db = require('../public/javascripts/db');

/* GET users listing. */
router.get('/', function (req, res, next) {
  let sql =
    "SELECT * FROM scout_agency;";

  db.query(sql, function (err, data, fields) {
    let all_agencies;

    console.log("data:" + data);
    if (data != undefined) {
      all_agencies = data;
    } else {
      all_agencies = []
    }
    res.render('createTask', { scout_agencies: all_agencies })

  });

  // router.get('/' + agency_id, function (req, res, next) {
  //   let sql = "INSERT INTO task (gender, height_min, height_max, weight_min, weight_max, age_min, age_max, position, time, \
  //     scout_num, preferred_foot, salary_min, salary_max, transfer_price_max, transfer_price_min)";

  //   if (err) throw err;

  //   let usertype = data[0].usertype;

  //   if (usertype == "scout_agency") {
  //     let values = {
  //       gender: req.body.gender,
  //       height_min: req.body.height_min,
  //       height_max: req.body.height_max,
  //       weight_min: req.body.weight_min,
  //       weight_max: req.body.weight_max,
  //       age_min: req.body.age_min,
  //       age_max: req.body.age_max,
  //       position: req.body.position,
  //       time: req.body.time,
  //       scout_num: req.body.number_of_scouts,
  //       preferred_foot: req.body.preferred_foot,
  //       salary_min: req.body.salary_min,
  //       salary_max: req.body.salary_max,
  //       transfer_price_max: req.body.transfer_price_max,
  //       transfer_price_min: req.body.transfer_price_min,
  //       agency_id: agency_id
  //     }
  //     console.log(values);
  //   }
  // });

  router.post("/", function (req, resp) {
    let sql = "INSERT INTO task (foot, position, time, scout_num, assigned_date, status, agency_id, transfer_price_min, transfer_price_max, salary_min, salary_max, age_min, age_max, weight_min, weight_max, height_min, height_max) VALUES ";
    console.log("why dont you work ")
    // if (err) throw err;
    // let usertype = data[0].usertype;
    // console.log(usertype);
    // if (usertype == "scout_agency") {
    console.log(req.body.gender)
    let values = "( \
      req.body.preferred_foot, \
      req.body.position, \
      req.body.time,  \
      req.body.number_of_scouts," +
      new Date().toString() +
      ", \'complated\', \
      req.body.agency_id, \
      req.body.transfer_price_min, \
      req.body.transfer_price_max, \
      req.body.age_min, \
      req.body.age_max, \
      req.body.salary_min, \
      req.body.salary_max, \
      req.body.weight_min, \
      req.body.weight_max, \
      req.body.height_min, \
      req.body.height_max, \
      )"

    sql = sql + values;
    console.log(sql);
    db.query(sql, function (err, result) {
      if (err) throw err;

      res.redirect("../");
    });
    // }
  });
});
module.exports = router;
