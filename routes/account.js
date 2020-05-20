const express = require('express');
const router = express.Router();
const db = require('../public/javascripts/db');



/* GET users listing. */
router.get('/', function(req, res, next) {
    if (!req.session.user) {
        res.redirect( '../login');
    }
    else {
        console.log(req.session.user);
        var sql='SELECT * FROM user WHERE user_id = ' + req.session.user;

        db.query(sql, function (err, data, fields) {
            if (err) throw err;
            
            let usertype = data[0].usertype;
            sql = 'SELECT * FROM user INNER JOIN ' + usertype + 
            ' on user.user_id =' + usertype + '.user_id' + 
            ' WHERE user.user_id = ' + req.session.user;
            
            db.query(sql, function (err, data, fields){
                if (err) throw err;
                res.render('account', { title: 'account', userData: data[0]});})
        });        
    }
        
});

module.exports = router;
