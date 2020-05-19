const express = require('express');
const router = express.Router();
const db = require("../public/javascripts/db");


/* GET home page. */

let footballer;
db.query("CREATE VIEW IF NOT EXISTS players AS\
          SELECT forename, surname, image, nationality, height, \
          position, foot, transfer_price, club_name, (YEAR(CURDATE()) - YEAR(birth_date)) AS age\
          FROM images, footballer \
          WHERE footballer.image_id = images.id\
          GROUP BY player_id", (err, result) => {
    if (err) {
        throw err;
        console.log("error");
    }
});

router.get('/', function(req, res, next) {
    cl(res, func, "SELECT * FROM players");
});



function cl(res, callback, query) {
    db.query(query, (err, result) => {
        if (err) {
            throw err;
            console.log("error");
        }
        footballer = result;
        console.log("our results 1" + result);
        callback(res);
    });
}

function func(res){
    console.log("our results " + JSON.stringify(footballer));
    res.render('../views/footballer', { footballers: footballer });
}

function search(req, res, callback){
    let values = req.body;
    let checked = req.body.checked;
    if (checked.indexOf("age")){
        db.query("SELECT * FROM player WHERE age < '${values.age[0]}' AND age > '${values.age[1]}'", (err, result) => {
           if (err)
               throw err;
           footballer = result;
        });
    }
    if(checked.indexOf("nationality")){
        db.query("SELECT * FROM footballer WHERE nationality LIKE '%${values.nationality}%'");
    }

    if(checked.indexOf("height")){

    }
    func(res);

}


router.post('/', function (req, resp) {
    search(req, resp, func);
});



module.exports = router;