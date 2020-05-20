const express = require("express");
const router = express.Router();
const db = require('../public/javascripts/db');

/* GET home page. */
router.get("/", function (req, res, next) {

  var sql = "SELECT * FROM news ORDER BY date DESC";

  db.query(sql, function (err, data, fields) {
    if (err) throw err;
       
  });

  res.render("index", { title: "Express" });
});

router.post('/', function (req, resp){
    //resp.end(JSON.stringify(response.body));
    session = req.session;
    let sql = `SELECT id FROM user WHERE username = '${req.body.username}' AND password = '${req.body.password}'`;
    db.query(sql, (err, result) => {
        if(err)
            throw err;
        if(result.length > 0){
            //resp.send("Logged");
            resp.redirect('/');
            session.uniqueID = result[0].id;
        }
        else
            resp.end("Wrong username or password!");
    });
});

module.exports = router;