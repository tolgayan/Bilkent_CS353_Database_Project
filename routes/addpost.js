
const express = require('express');
const router = express.Router();
const db = require('../public/javascripts/db');



router.get("/", function (req, res, next) {
    if (!req.session.user) {
      res.redirect("../");
    } else {
      let sql = "SELECT * FROM user WHERE user_id = " + req.session.user;
  
      db.query(sql, function (err, data, fields) {
        if (err) throw err;
  
        let usertype = data[0].usertype;
  
        if (usertype == "editor") res.render("add_post");
        else res.redirect("http://localhost:4000/news");
      });
    }
  });

  router.post("/", function (req, res) {
    if(req.session.user) {
      let sql = "SELECT * FROM user WHERE user_id = " + req.session.user;
  
      db.query(sql, function (err, data, fields) {
        if (err) throw err;
  
        let usertype = data[0].usertype;
  
        if (usertype == "editor") {
          let values = {
            title: req.body.title,
            category: req.body.category,
            content: req.body.content,
            editor_id: data[0].user_id,     
          }

          let stmt = "INSERT INTO news SET ?";
          db.query(stmt, values, (err, result) => {
            if (err) throw err;
            res.redirect("http://localhost:4000/news");
          });

        };
      });
    }
  });
  
  module.exports = router;
