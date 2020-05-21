const express = require('express');
const router = express.Router();
const db = require('../public/javascripts/db');

/* GET users listing. */
router.get('/', function(req, res, next) {
    if (!req.session.user) {
        res.render('login.ejs');
    }
    else {
        res.send("User already logged in");
        res.redirect('../');
    }
        
});

router.post('/', function (req, resp){
    //resp.end(JSON.stringify(response.body));
           
    let sql = `SELECT user_id FROM user WHERE email = '${req.body.email}' AND password = '${req.body.password}'`;
   
    db.query(sql, (err, result) => {
        if(err)
            throw err;
        if(result.length > 0){                 
            req.session.user = result[0].user_id;

            resp.redirect('/');
        }
        else {
            resp.redirect("http://localhost:4000/login");
        }
        
            
    });
});

module.exports = router;