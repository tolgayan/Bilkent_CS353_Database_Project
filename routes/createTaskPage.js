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

  router.post('/', function (req, resp) {
    // resp.end(JSON.stringify(response.body));
    // session = req.session;
    // let sql = `SELECT id FROM user WHERE username = '${req.body.username}' AND password = '${req.body.password}'`;
    // db.query(sql, (err, result) => {
    //     if(err)
    //         throw err;
    //     if(result.length > 0){
    //         //resp.send("Logged");
    //         resp.redirect('/');
    //         session.uniqueID = result[0].id;
    //     }
    //     else
    //         resp.end("Wrong username or password!");
    // });
  });
});
module.exports = router;
