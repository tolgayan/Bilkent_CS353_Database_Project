const express = require('express');
const router = express.Router();
const db = require('../public/javascripts/db');

/* GET users listing. */
router.get('/', function(req, res, next) {
    if (!req.session.user) {
        res.sendFile( 'login.html', {root: 'public/html/'});
    }
    else {
        console.log("User already logged in. Current user id: " + req.session.user);
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
        else
            resp.end("Wrong email or password!");
    });
});

module.exports = router;