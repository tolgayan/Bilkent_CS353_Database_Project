const express = require("express");
const router = express.Router();
const db = require("../public/javascripts/db");

/* GET users listing. */
router.get("/", function (req, res, next) {
  if (!req.session.user) {
    res.redirect("../login");
  } else {
    var sql = "SELECT * FROM user WHERE user_id = " + req.session.user;
    db.query(sql, function (err, data, fields) {
      if (err) throw err;

      let usertype = data[0].usertype;
      sql =
        "SELECT * FROM user INNER JOIN " +
        usertype +
        " on user.user_id =" +
        usertype +
        ".user_id" +
        " WHERE user.user_id = " +
        req.session.user;

      db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.render("account", { title: "account", userData: data[0] });
      });
    });
  }
});

router.get("/:userId([0-9]+)/modify", function (req, res, next) {
  if (!req.session.user) res.redirect("http://localhost:4000");

  if (req.session.user != req.params["userId"])
    res.redirect("http://localhost:4000");

  var sql = "SELECT * FROM user WHERE user_id = " + req.session.user;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    let usertype = data[0].usertype;
    sql =
      "SELECT * FROM user INNER JOIN " +
      usertype +
      " on user.user_id =" +
      usertype +
      ".user_id" +
      " WHERE user.user_id = " +
      req.session.user;

    db.query(sql, function (err, data, fields) {
      if (err) throw err;
      res.render("modify_account", { userData: data[0] });
    });
  });
});

router.post("/:userId([0-9]+)/modify", function (req, res) {
  if (!req.session.user) res.redirect("http://localhost:4000");
  if (req.session.user != req.params["userId"])
    res.redirect("http://localhost:4000");

  if (req.body.formtype == "modify") {
    console.log(req.body);

    let usersql = "UPDATE user SET ? WHERE user_id = " + req.params["userId"];
    let specsql =
      "UPDATE " +
      req.body["usertype"] +
      " SET ? WHERE user_id = " +
      req.params["userId"];

    let userValues = {};
    let specValues = {};
    Object.keys(req.body).forEach(function (key) {
      if (key == "password" || key == "email") userValues[key] = req.body[key];
      else if (key != "formtype" && key != "usertype")
        specValues[key] = req.body[key];
    });

    Object.keys(specValues).forEach(function (key) {
      if (specValues[key].length == 0) specValues[key] = 0;
    });

    console.log(specValues);

    db.query(usersql, userValues, (err, result) => {
      if (err) throw err;
      db.query(specsql, specValues, (err, result) => {
        if (err) throw err;
        res.redirect("http://localhost:4000/account");
      });
    });
  } else if (req.body.formtype == "delete") {
    let usersql = "DELETE FROM user WHERE user_id = " + req.params["userId"];
    let specsql =
      "DELETE FROM " +
      req.body["usertype"] +
      " WHERE user_id = " +
      req.params["userId"];

    db.query(specsql, (err, result) => {
      if (err) throw err;
      db.query(usersql, (err, result) => {
        if (err) throw err;
        req.session.destroy();
        res.redirect("http://localhost:4000/");
      });
    });
  }
});

module.exports = router;
