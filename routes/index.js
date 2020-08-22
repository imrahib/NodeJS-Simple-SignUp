var express = require('express');
var router = express.Router();
var CreateMongoServer = require("../config/db");

//Here we create a new Mongo Server
CreateMongoServer();

/* GET home page. */
router.get('/', function(req, res, next) {
 res.json({ message: "API Working" });
});

module.exports = router;
