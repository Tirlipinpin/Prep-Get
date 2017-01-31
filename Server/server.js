var express = require('express');
var bodyParser = require('body-parser');
var compareVersions = require('compare-versions');
var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'prep_get'
});

var app = express();

const port = 4242;

app.use(bodyParser.json())

.post('/install', function (req, res) {
    if (req.body.packets) {
        console.log("POST /");
        res.end(JSON.stringify(req.body));
    }
    else {
        res.sendStatus(403);
    }
})

.post('/search', function (req, res) {
    if (req.body.packets) {
        console.log("POST /");
        res.end(JSON.stringify(req.body));
    }
    else {
        res.sendStatus(403);
    }
})

.post('/upload', function (req, res) {
    if (req.body.packets) {
        console.log("POST /");
        res.end(JSON.stringify(req.body));
    }
    else {
        res.sendStatus(403);
    }
})

.post('/list', function (req, res) {
    if (req.body.packets) {
        console.log("POST /");
        res.end(JSON.stringify(req.body));
    }
    else {
        res.sendStatus(403);
    }
})

.use(function (req, res) {
    res.sendStatus(403);
})

.listen(port);
console.log('Listening at http://localhost:' + port)