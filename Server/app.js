var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var config = require('./config/config.js');
var logger = require('./controllers/logger.js');
var app = express();

//app.use(bodyParser.json());
var router = express.Router();

// middleware that is specific to this router
router.use(logger.log);

app.use(bodyParser.json());
app.use(router);
app.listen(config.port);
