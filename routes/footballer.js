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
    console.log("get" + req.body);
    cl(res, func, "SELECT * FROM players");
});



function cl(res, callback, query) {
    db.query(query, (err, result) => {
        if (err) {
            throw err;
            console.log("error");
        }
        footballer = result;

        console.log("our results 1" + JSON.stringify(result));

        /*
        for(let i = 0; i < result.length; i++){
            db.query(`SELECT report_id FROM final_report WHERE player_id = '${result.player_id}'`, (err,  reports) => {
                if (err) {
                    throw err;
                    console.log("error");
                }
               if(reports.length > 0) {
                   added.push(true);
                   console.log("added");
               }
               else
                   added.push(false);
            });
        }

         */
        callback(res);
    });
}

function func(res){
    console.log("our results " + footballer);
    res.render('../views/footballer', { footballers: footballer});
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
            sql += `AND position LIKE '%${values.position}%' `;
        }
        if (checkbox.indexOf("foot") > -1 ){
            sql += `AND foot LIKE '%${values.foot}%'`;
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
            sql += `AND position LIKE '%${values.position}%' `;
        }
        if (checkbox.indexOf("foot") > -1) {
            sql += `AND foot LIKE '%${values.foot}%'`;
        }
    }

    else if (checkbox.indexOf("height") > -1 ){
        sql += `WHERE height >= '${values.height[0]}' AND height <= '${values.height[1]}' `;
        if (checkbox.indexOf("age") > -1 ){
            sql += `AND age >= '${values.age[0]}' AND \
                            age <= '${values.age[1]}' `;
        }
        if (checkbox.indexOf("position") > -1 ){
            sql += `AND position LIKE '%${values.position}%' `;
        }
        if (checkbox.indexOf("foot") > -1 ){
            sql += `AND foot LIKE '%${values.foot}%'`;
        }
    }

    else if (checkbox.indexOf("age") > -1 ){
        sql += `WHERE age >= '${values.age[0]}' AND \
                            age <= '${values.age[1]}' `;
        if (checkbox.indexOf("position") > -1 ){
            sql += `AND position LIKE '%${values.position}%' `;
        }
        if (checkbox.indexOf("foot") > -1 ){
            sql += `AND foot LIKE '%${values.foot}%'`;
        }
    }
    else if(checkbox.indexOf("position") > -1 ){
        sql += `WHERE position LIKE '%${values.position}%' `;
        if (checkbox.indexOf("foot") > -1 ){
            sql += `AND foot LIKE '%${values.foot}%'`;
        }
    }
    if (checkbox.indexOf("foot") > -1 ){
        sql += `WHERE foot LIKE '%${values.foot}%'`;
    }

    //sql = `SELECT * FROM players WHERE nationality LIKE '%${values.nationality}%'`;
    cl(res, func, sql);
}


router.post('/search', function (req, resp) {
    let value = req.body;

    //console.log("Post: " + JSON.stringify(req.body));
    //console.log("Post: " + JSON.stringify(req.body));
    search(req, resp);
});

router.post('/', function (req, resp) {
    let value = req.body;

    //console.log("Post: " + JSON.stringify(req.body));
    console.log("Post: " + req.body.id);
});


module.exports = router;