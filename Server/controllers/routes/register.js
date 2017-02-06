/*
** '/list' route
*/

var hash = require('sha256');
var logger = require('../logger.js');
var connection = require("../../config/db.js").connection;

var secret = 'kd9/ghFGHt78678]76[]';

module.exports = {
    POST: function (req, res)
    {
		if (req.body.name !== undefined && req.body.pass !== undefined) {
			var query = 'INSERT INTO users (login, pass, auth) VALUES (\'' + req.body.name + '\', \'' + hash(secret + req.body.pass) + '\', 1)';
			connection.query(query, function(err, rows, fields) {
				if (!err) {
					logger.log(1, 'New user registered : ' + req.body.name);
					res.sendStatus(200);
				} else {
					logger.log(0, 'Cannot register user : ' + req.body.name);
					res.sendStatus(403);
				}
			})
		} else {
			res.sendStatus(403);
		}
    }
}

