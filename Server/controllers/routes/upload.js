/*
** '/upload' route
*/

var fs = require('fs');
var getRawBody = require('raw-body');
var path = require('path');
var jwt = require('json-web-token');
var logger = require('../logger.js');
var connection = require("../../config/db.js").connection;

var secret = 'kd9/ghFGHt78678]76[]';
var appDir = path.dirname(require.main.filename);

module.exports = {
    POST: function (req, res)
    {
        if (req.headers.package_name !== undefined
            && req.headers.package_version !== undefined
            && req.headers["jwt"] !== undefined
            && req.headers["content-type"] === "application/octet-stream")
        {
                jwt.decode(secret, req.headers["jwt"], function (err, decodedPayload, decodedHeader) {
                    if (err || decodedPayload.admin == 'false') {
                        res.sendStatus(403);
                    } else {
                        getRawBody(req)
                        .then(function (buf) {
                            var dir = appDir + '/packages/' + req.headers.package_name + '/';
                            try {
                                fs.statSync(dir);
                            } catch(e) {    
                                try {
                                    fs.mkdirSync(dir);
                                    var query = 'INSERT INTO packages (name) VALUES (\'' + req.headers.package_name + '\')';
                                    connection.query(query, function(err, rows, fields) {
                                        if (err) {
                                            logger.log(0, 'Can\'t insert package : ' + req.headers.package_name);
                                        }
                                    });
                                } catch(e) {
                                    return e;
                                }
                            }
                            var file = dir + req.headers.package_name + '_' + req.headers.package_version + '.tar.gz';
                            if (!fs.existsSync(file)) {
                                var writeStream = fs.createWriteStream(file);
                                writeStream.write(buf);
                                var query = 'SELECT id FROM packages WHERE name = \'' + req.headers.package_name + '\'';
                                connection.query(query, function(err, fetch, fields) {
                                    if (!err && fetch[0] != undefined)
                                    {
                                        var query = 'INSERT INTO packages_versions (package_id, version)'
                                        + ' VALUES (\'' + fetch[0].id + '\', \'' + req.headers.package_version + '\')';
                                        connection.query(query, function(err, rows, fields) {
                                            if (err) {
                                                logger.log(0, 'Can\'t insert package\'s version : ' + req.headers.package_name);
                                            } else {
                                                res.sendStatus(200);
                                            }
                                        });
                                    }
                                    else
                                    {
                                        logger.log(0, 'Can\' find package : ' + req.headers.package_name);
                                    }
                                });
                            } else {
                                res.sendStatus(403);
                            }
                        })
                    }
                });
        } else {
            res.sendStatus(206);
        }
    }
}

