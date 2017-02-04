/*
** '/list' route
*/

var mysql = require('mysql');
var logger = require('../logger.js');
var db_config = require("../../config/db.js");
var connection = mysql.createConnection(db_config.db);

module.exports = {
    GET: function (req, res)
    {
        connection.query('SELECT name FROM packages ORDER BY name ASC', function(err, rows, fields) {
            if (!err && rows[0] != undefined) {
                logger.log(1, 'List successfully append');
                res.end(JSON.stringify(rows));
            }
            else {
                logger.log(0, 'Cannot get all packages by /list');
                res.sendStatus(404);
            }
        })
    }
}

