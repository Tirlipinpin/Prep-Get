/*
** '/list' route
*/

var logger = require('../logger.js');
var connection = require("../../config/db.js").connection;

module.exports = {
    GET: function (req, res)
    {
        connection.query('SELECT name, version FROM packages_versions JOIN packages ON id = package_id', function(err, rows, fields) {
            if (!err && rows[0] != undefined)
			{
                var obj_name = ""
				var result = [];
				for (index in rows)
				{
					if (obj_name === "" || rows[index].name !== result[result.length - 1].name)
					{
						obj_name = rows[index].name;
						result.push({ name: obj_name, versions: [rows[index].version] });
					}
					else if (rows[index].name === result[result.length - 1].name)
					{
						result[result.length - 1].versions.push(rows[index].version);
					}
				}
				logger.log(1, 'List successfully append');
				res.end(JSON.stringify(result));
            }
            else
			{
                logger.log(0, 'Cannot get all packages by /list');
                res.sendStatus(404);
            }
        })
    }
}

