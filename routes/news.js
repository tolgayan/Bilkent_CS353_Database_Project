const express = require("express");
const router = express.Router();
const db = require("../public/javascripts/db");



router.get("/", function (req, res, next) {
  let sql = "SELECT * FROM news ORDER BY date DESC";

  db.query(sql, function (err, data, fields) {
    console.log("news data test");
    console.log(data);
  });

  if (!req.session.user) {
    res.render("news");
  } else {
    let sql = "SELECT * FROM user WHERE user_id = " + req.session.user;

    db.query(sql, function (err, data, fields) {
      if (err) throw err;

      let usertype = data[0].usertype;

      if (usertype == "editor") res.render("news_editor");
      else res.render("news");
    });
  }
});

router.post("/", function (req, resp) {});

module.exports = router;
