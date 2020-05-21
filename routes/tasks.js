const express = require('express');
const router = express.Router();
const db = require("../public/javascripts/db");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render( '../views/tasks');
});

module.exports = router;