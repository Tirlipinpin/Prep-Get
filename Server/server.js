var express             = require('express');
var bodyParser          = require('body-parser');
var compareVersions     = require('compare-versions');
var mysql               = require('mysql');
var fs                  = require('fs');

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
    if (req.body.packages) {
        console.log("POST /");
        var obj = [];
        //console.log(JSON.stringify(req.body));
        for (var key in req.body.packages) {
            //console.log(req.body.packages[key].name);
            //console.log(req.body.packages[key].version);
            //console.log(req.body.packages[key].current_version);
            CheckVersion(req.body.packages[key].name, req.body.packages[key].version, function(is_exists) {
                if (is_exists === true) {
                    req.body.packages[key].url = '/packages/' + req.body.packages[key].name + '/' + req.body.packages[key].name + '_' + req.body.packages[key].version + '.tar.gz';
                    obj[key] = req.body.packages[key];
                }
            })
        }
        console.log(req.body.packages);
        res.end(JSON.stringify(obj));
    }
    else {
        res.sendStatus(403);
    }
})

.get('/packages/:package/:file', function (req, res) {
    SendFile(req.originalUrl, res);
})

.post('/search', function (req, res) {
    if (req.body.packages) {
        console.log("POST /");
        res.end(JSON.stringify(req.body));
    }
    else {
        res.sendStatus(403);
    }
})

.post('/upload', function (req, res) {
    if (req.body.packages) {
        console.log("POST /");
        res.end(JSON.stringify(req.body));
    }
    else {
        res.sendStatus(403);
    }
})

.post('/list', function (req, res) {
    console.log("POST /");
    connection.query('SELECT name from packages', function(err, rows, fields) {
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

function CheckVersion(name, version = "0", callback) {
    if (version === undefined || version === "0") {
        connection.query('select name from packages WHERE name = \'' + name + '\'', function(err, rows, fields) {
            if (!err && rows[0] != undefined) {
                console.log('[LOG] Successfully found package : ' + name);
                return (callback(true));
            }
            else {
                console.log('[ERROR] Package name not found : ' + name);
                return (callback(false));
            }
        })
    } else {
        connection.query('select name, version from packages_versions join packages on packages.id = packages_versions.package_id where name = \'' + name + '\' and packages_versions.version = \'' + version + '\'', function(err, rows, fields) {
            if (!err && rows[0] != undefined) {
                console.log('[LOG] Successfully found package : ' + rows[0].name + ' version : ' + rows[0].version);
                return (callback(true));
            }
            else {
                console.log('[ERROR] Package name or version not found : ' + name + ' version : ' + version);
                return (callback(false));
            }
        })
    }
}

function SendFile(filePath, res) {
    if (fs.existsSync(__dirname + filePath)) {
        console.log('[LOG] Successfully downloaded package : ' + filePath);
        res.sendFile(filePath, {root: __dirname });
    }
    else {
        console.log('[ERROR] Package file not found : ' + filePath);
        res.sendStatus(404);
    }
}