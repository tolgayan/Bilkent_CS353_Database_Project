const express = require("express");
const router = express.Router();
const db = require("../public/javascripts/db");

router.get("/", function (req, res, next) {
  let sql =
    "SELECT * FROM news INNER JOIN editor on news.editor_id = editor.user_id ORDER BY date DESC";

  db.query(sql, function (err, data, fields) {
    let all_news;

    if (data != undefined) {
      all_news = data;
    } else {
      all_news = [];
    }

    if (!req.session.user) {
      res.render("news", { all_news: all_news, editor_mode: 0 });
    } else {
      let sql = "SELECT * FROM user WHERE user_id = " + req.session.user;

      db.query(sql, function (err, data, fields) {
        if (err) throw err;

        let usertype = data[0].usertype;
        if (usertype == "editor")
          res.render("news", { all_news: all_news, editor_mode: 1 });
        else res.render("news", { all_news: all_news, editor_mode: 0 });
      });
    }
  });
});

router.get("/:news_id([0-9]+)", function (req, res) {
  let sql =
    "SELECT * FROM news INNER JOIN editor on news.editor_id = editor.user_id WHERE news.news_id = " +
    req.params["news_id"];

  db.query(sql, function (err, data, fields) {
    if (data[0] != undefined) {
      let post_data = data[0];
      let editor_id = post_data.editor_id;
      let editor_mode = 0;
      if (req.session.user && req.session.user == editor_id) editor_mode = 1;
      res.render("post", { post_data: post_data, editor_mode: editor_mode });
    } else {
      res.redirect("http://localhost:4000/news");
    }
  });
});

router.get("/:news_id([0-9]+)/modify", function (req, res) {
  let sql =
    "SELECT * FROM news INNER JOIN editor on news.editor_id = editor.user_id WHERE news.news_id = " +
    req.params["news_id"];

  db.query(sql, function (err, data, fields) {
    if (data[0] != undefined) {
      let post_data = data[0];
      let editor_id = post_data.editor_id;
      if (req.session.user && req.session.user == editor_id)
        res.render("modify_post", { post_data: post_data });
      else {
        res.redirect("http://localhost:4000/news");
      }
    } else {
      res.redirect("http://localhost:4000/news");
    }
  });
});

router.post("/:news_id([0-9]+)/modify", function (req, res) {
  if (req.body.formtype == "modify") {
    let sql = "UPDATE news SET ? WHERE news_id = " + req.params["news_id"];

    let values = {
      title: req.body.title,
      category: req.body.category,
      content: req.body.content,
    };

    db.query(sql, values, (err, result) => {
      if (err) throw err;
      res.redirect("http://localhost:4000/news");
    });
  }

  else if (req.body.formtype == "delete") {
    let sql = "DELETE FROM news WHERE news_id = " + req.params["news_id"];
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.redirect("http://localhost:4000/news");
    });
  }
});

module.exports = router;
