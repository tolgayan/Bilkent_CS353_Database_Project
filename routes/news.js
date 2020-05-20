const express = require("express");
const router = express.Router();
const db = require("../public/javascripts/db");

router.get("/", function (req, res, next) {
  let sql =
    "SELECT * FROM news INNER JOIN editor on news.editor_id = editor.user_id ORDER BY date DESC";

  db.query(sql, function (err, data, fields) {
    let all_news;

    console.log(data);
    if (data != undefined) {
      all_news = data;
    } else {
      all_news = []
    }

    if (!req.session.user) {
      res.render("news", { all_news: all_news });
    } else {
      let sql = "SELECT * FROM user WHERE user_id = " + req.session.user;

      db.query(sql, function (err, data, fields) {
        if (err) throw err;

        let usertype = data[0].usertype;
        if (usertype == "editor")
          res.render("news_editor", { all_news: all_news });
        else res.render("news", { all_news: all_news });
      });
    }
  });
});

router.post("/", function (req, resp) {});

module.exports = router;
