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
        for (var key in req.body.packets) {
            console.log(req.body.packets[key].name);
            console.log(req.body.packets[key].version);
            console.log(req.body.packets[key].current_version);
        }
        //console.log(typeof(req.body.packets[0].name));
        //select name, version from packets_versions join packets on packets.id = packets_versions.packet_id where name = "nodejs" and packets_versions.version = "6.8";.
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
    console.log("POST /");
    connection.query('SELECT name from packets', function(err, rows, fields) {
    if (!err) {
        console.log('The solution is: ', rows);
        res.end(JSON.stringify(rows));
    }
    else {
        console.log('Error while performing Query.');
        res.sendStatus(404);
    }
    })
})

.use(function (req, res) {
    res.sendStatus(403);
})

.listen(port);
console.log('Listening at http://localhost:' + port)