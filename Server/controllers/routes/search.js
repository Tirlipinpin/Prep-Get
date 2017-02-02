/*
**  '/search' route
**
**  Receive this king of Data (JSON)
**
**  [
**      "sql",
**      "php"
**  ]
**
*/

var mysql = require('mysql');
var logger = require('../logger.js');
var db_config = require("../../config/db.js");
var connection = mysql.createConnection(db_config.db);

module.exports = {
    POST: function (req, res)
    {
        if (req.body[0]) {
            var qry_string = 'SELECT name FROM packages';
            for (var key in req.body) {
                key = parseInt(key);
                if (key == 0) {
                    qry_string += ' WHERE name LIKE \'%' + req.body[key] + '%\'';
                } else {
                    qry_string += ' OR name LIKE \'%' + req.body[key] + '%\'';
                }
                if (req.body[key + 1] === undefined) {
                    qry(qry_string);
                }
            }
            function qry(str) {
                connection.query(str, function(err, rows, fields) {
                    if (!err && rows[0] != undefined) {
                        logger.log(1, 'Search successfully append');
                        res.end(JSON.stringify(rows));
                    }
                    else {
                        logger.log(0, 'Search not found');
                        res.sendStatus(404);
                    }
                })
            };
        }
        else {
            res.sendStatus(403);
        }
    }
}

