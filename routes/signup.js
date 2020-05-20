const express = require("express");
const router = express.Router();
const db = require("../public/javascripts/db");

let session;

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.sendFile("signup.html", { root: "public/html" });
});

router.post("/", function (req, resp) {
  //resp.end(JSON.stringify(response.body));
  session = req.session;

  //Insert user data
  let type = req.body.formtype;

  let userstmt = "INSERT INTO user SET ?";
  let specstmt = "";
  specstmt = specstmt.concat("INSERT INTO ", type, " SET ?");

  let userInputs = ["email", "usertype", "password"];
  let specInputs;

  if (type == "club") {
    var values = {
      club_name: req.body.club_name,
      password: req.body.password,
      email: req.body.email,
      country: req.body.country,
      usertype: "club",
    };
    specInputs = ["club_name", "country"];
  } else if (type == "scout_agency") {
    var values = {
      agency_name: req.body.agencyname,
      password: req.body.password,
      email: req.body.email,
      usertype: "scout_agency",
    };
    specInputs = ["agency_name", "country"];
  } else if (type == "agent") {
    var values = {
      agent_name: req.body.agent_name,
      password: req.body.password,
      email: req.body.email,
      usertype: "agent",
    };
    specInputs = ["agent_name", "country"];
  } else if (type == "standard") {
    var values = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      usertype: "standard",
    };
    specInputs = ["username"];
  }

  let userTableVals = Object.keys(values)
    .filter((key) => userInputs.includes(key))
    .reduce((obj, key) => {
      obj[key] = values[key];
      return obj;
    }, {});

  let specTableVals = Object.keys(values)
    .filter((key) => specInputs.includes(key))
    .reduce((obj, key) => {
      obj[key] = values[key];
      return obj;
    }, {});


  db.query(userstmt, userTableVals, (err, result) => {
    if (err) throw err;
    id = result.insertId;
    saveToSpecTable(id);
  });

  function saveToSpecTable(id) {
    specTableVals.user_id = parseInt(id);

    db.query(specstmt, specTableVals, (err) => {
      if (err) throw err;
      else resp.send("Done");
    });
  }
});

/*
router.get('redirects', function(req, resp){
    if(session.uniqueID){
        resp.redirect('/admin');
    }
    else{
        resp.end("Who are you?");
    }
}
 */

module.exports = router;
