const express = require('express');
const router = express.Router();
const db = require('../public/javascripts/db');

let session;

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.sendFile( 'signup.html', {root: '../public/html'});
});

router.post('/', function (req, resp){
    //resp.end(JSON.stringify(response.body));
    session = req.session;

    //Insert user data
    let stmt = "INSERT INTO user SET ?";
    let values = {username: req.body.username, password: req.body.password};
    db.query(stmt, values);
    db.query(stmt, values, (err) =>{
        if(err)
            throw err;
        else
            resp.send("Done");
    });
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