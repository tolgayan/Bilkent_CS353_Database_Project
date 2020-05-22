const express = require('express');
const router = express.Router();
const db = require("../public/javascripts/db");


/* GET home page. */

let footballer;
let added = [];
db.query("CREATE VIEW IF NOT EXISTS players AS \
          SELECT player_id, forename, surname, image, nationality, height, gender, \
          position, foot, transfer_price, club_name, (YEAR(CURDATE()) - YEAR(birth_date)) AS age \
          FROM images, footballer \
          WHERE footballer.image_id = images.id \
          GROUP BY player_id", (err, result) => {
    if (err) {
        throw err;
        console.log("error");
    }
});

router.get('/', function(req, res, next) {
    if (!req.session.user) {
        res.redirect("../login");
    }
    else {
        cl(res, func, "SELECT * FROM players");
    }
});



function cl(res, callback, query) {
    db.query(query, (err, result) => {
        if (err) {
            throw err;
            console.log("error");
        }
        footballer = result;

        console.log("our results 1" + JSON.stringify(result));
        callback(res);
    });
}

function func(res){
    res.render('footballer', { footballers: footballer});
}

function search(req, res){
    let values = req.body;
    let checkbox = req.body.checkbox;
    let sql = `SELECT * FROM players `;

    if (checkbox.indexOf("gender") > -1 ){
        sql += `WHERE gender LIKE '%${values.gender}%' `;
        if (checkbox.indexOf("nationality") > -1 ){
            sql += `AND nationality LIKE '${values.nationality}%' `;
        }
        if (checkbox.indexOf("height") > -1 ){
            sql += `AND height >= '${values.height[0]}' AND height <= '${values.height[1]}' `;
        }
        if (checkbox.indexOf("age") > -1 ){
            sql += `AND age >= '${values.age[0]}' AND \
                            age <= '${values.age[1]}' `;
        }
        if (checkbox.indexOf("position") > -1 ){
            sql += `AND position LIKE '${values.position}%' `;
        }
        if (checkbox.indexOf("foot") > -1 ){
            sql += `AND foot LIKE '${values.foot}%'`;
        }
    }

    else if (checkbox.indexOf("nationality") > -1 ){
        sql += `WHERE nationality LIKE '${values.nationality}%' `;
        if(checkbox.indexOf("height") > -1 ) {
            sql += `AND height >= '${values.height[0]}' AND height <= '${values.height[1]}' `;
        }
        if (checkbox.indexOf("age") > -1) {
            sql += `AND age >= '${values.age[0]}' AND \
                            age <= '${values.age[1]}' `;
        }
        if (checkbox.indexOf("position") > -1) {
            sql += `AND position LIKE '${values.position}%' `;
        }
        if (checkbox.indexOf("foot") > -1) {
            sql += `AND foot LIKE '${values.foot}%'`;
        }
    }

    else if (checkbox.indexOf("height") > -1 ){
        sql += `WHERE height >= '${values.height[0]}' AND height <= '${values.height[1]}' `;
        if (checkbox.indexOf("age") > -1 ){
            sql += `AND age >= '${values.age[0]}' AND \
                            age <= '${values.age[1]}' `;
        }
        if (checkbox.indexOf("position") > -1 ){
            sql += `AND position LIKE '${values.position}%' `;
        }
        if (checkbox.indexOf("foot") > -1 ){
            sql += `AND foot LIKE '${values.foot}%'`;
        }
    }

    else if (checkbox.indexOf("age") > -1 ){
        sql += `WHERE age >= '${values.age[0]}' AND \
                            age <= '${values.age[1]}' `;
        if (checkbox.indexOf("position") > -1 ){
            sql += `AND position LIKE '${values.position}%' `;
        }
        if (checkbox.indexOf("foot") > -1 ){
            sql += `AND foot LIKE '${values.foot}%'`;
        }
    }
    else if(checkbox.indexOf("position") > -1 ){
        sql += `WHERE position LIKE '${values.position}%' `;
        if (checkbox.indexOf("foot") > -1 ){
            sql += `AND foot LIKE '${values.foot}%'`;
        }
    }
    if (checkbox.indexOf("foot") > -1 ){
        sql += `WHERE foot LIKE '${values.foot}%'`;
    }

    cl(res, func, sql);
}


router.post('/search', function (req, resp) {
    let value = req.body;
    search(req, resp);
});


function funny(req, result){
    db.query("SELECT * FROM assignment WHERE assignment.scout_id=4 AND assignment.status='incomplete'", (err, result) => {
        if (err) {
            throw err;
            console.log("error");
        }
        callback(req, result);
    });
}

function callback(req, result){
    if(result.length > 0) {
        console.log(result[0].task_id);
        db.query(`INSERT INTO final_report (player_id, scout_id, task_id, rating, comment) VALUES('${req.body.id}', 4, '${result[0].task_id}', "", "")`, (err, res) => {
            if (err) {
                throw err;
                console.log("error");
            }
        });
    }
}



router.post('/', function (req, resp) {
    funny(req, resp, callback);
});


module.exports = router;