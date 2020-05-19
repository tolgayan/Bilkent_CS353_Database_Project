const express = require('express');
const router = express.Router();
const db = require('../public/javascripts/db');

/* GET home page. */
let users;
router.get('/', function(req, res, next) {
  console.log(users);
  cl(res, func);
});

function cl(res, callback) {
  db.query("SELECT * FROM user", (err, result) => {
    if (err) {
      throw err;
      console.log("error");
    }
    users = result;
    callback(res);
  });
}

function func(res){
  res.render('../views/taskoffer', { result: users });
}

module.exports = router;
