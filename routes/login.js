const express = require('express');
const router = express.Router();
const db = require('../public/javascripts/db');

let session;

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.sendFile( 'login.html', {root: '../public/html'});
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