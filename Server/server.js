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
        
        rec(req.body.packages, 0);
        function rec(packages, key) {
            console.log(key);
            if (packages[key] === undefined) {
                res.end(JSON.stringify(packages));
            } else {
                CheckVersion(packages[key].name, packages[key].version, function(is_exists, version = '') {
                    if (is_exists) {
                        packages[key].url = '/packages/' + packages[key].name + '/' + packages[key].name + '_' + version + '.orig.tar.xz';
                    }
                    rec(packages, key+1);
                });
            }
        };
    }
    else {
        res.sendStatus(403);
    }
})

.get('/packages/:package/:file', function (req, res) {
    SendFile(req.originalUrl, res);
})

.post('/search', function (req, res) {
    if (req.body.search) {
        console.log("POST /");
        connection.query('SELECT name FROM packages WHERE name LIKE \'%' + req.body.search + '%\'', function(err, rows, fields) {
            if (!err && rows[0] != undefined) {
                console.log('The solution is: ', rows);
                res.end(JSON.stringify(rows));
            }
            else {
                console.log('Error while performing Query.');
                res.sendStatus(404);
            }
        })
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

function CheckVersion(name, version, callback) {
    if (version === undefined) {
        connection.query('SELECT version FROM packages_versions JOIN packages ON packages.id = packages_versions.package_id WHERE packages.name = \'' + name + '\' ORDER BY version DESC LIMIT 1;', function(err, rows, fields) {
            if (!err && rows[0] != undefined) {
                qry(name, rows[0].version);
            } else {
                console.log('[ERROR] Package not found : ' + name);
                callback(false);
            }
        });
    } else {
        qry(name, version); 
    }
    function qry(name, version) {
        connection.query('SELECT name, version FROM packages_versions JOIN packages ON packages.id = packages_versions.package_id WHERE name = \'' + name + '\' AND packages_versions.version = \'' + version + '\'', function(err, rows, fields) {
            if (!err && rows[0] != undefined) {
                console.log('[LOG] Successfully found package : ' + rows[0].name + ' version : ' + rows[0].version);
                return (callback(true, rows[0].version));
            }
            else {
                console.log('[ERROR] Package name or version not found : ' + name + ' version : ' + version);
                return (callback(false));
            }
        })
    };
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