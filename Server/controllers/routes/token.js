/*
**  '/token' route
**
**  Receive this king of Data (JSON)
**
**  {
**      "user": "gaudea_h",
**      "pass": "qwertyuiop"
**  }
**
*/

var hash = require('sha256');
var mysql = require('mysql');
var logger = require('../logger.js');
var db_config = require("../../config/db.js");
var connection = mysql.createConnection(db_config.db);
var jwt = require('json-web-token');

var secret = 'kd9/ghFGHt78678]76[]';
var payload = {
  "verified": "true",
  "admin": "false"
};

module.exports = {
    POST: function (req, res)
    {
        if (req.body.user !== undefined && req.body.pass !== undefined) {
            var query = 'SELECT auth FROM users WHERE login = \''
                + req.body.user + '\' AND pass = \'' + hash(secret + req.body.pass) + '\'';
            connection.query(query, function(err, rows, fields) {
                if (!err && rows[0] != undefined) {
                    if (rows.auth = 1) {
                        payload.admin = "true";
                    }
                    jwt.encode(secret, payload, function (err, token) {
                        if (err) {
                            res.end("false");
                        } else {
                            res.end(token);
                        }
                    });
                } else {
                    res.end("false");
                }
            });
        } else {
            res.end("false");
        }
    }
}