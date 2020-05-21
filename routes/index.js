const express = require("express");
const router = express.Router();
const db = require("../public/javascripts/db");

/* GET home page. */
router.get("/", function (req, res, next) {
  var sql = "SELECT * FROM news ORDER BY date DESC LIMIT 3";

  db.query(sql, function (err, data, fields) {
    if (err) throw err;


    res.render("mainpage", {news: data});
  });
});

module.exports = router;
