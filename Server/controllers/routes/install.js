/*
**  '/install' route
**
**  Receive this king of Data (JSON)
**
**  {
**      "packages":
**      [
** 		    {
** 			    "name": "mysql-5.6",
** 			    "version": "5.6.30"
** 		    },
** 		    {
** 			    "name": "php7.0",
** 			    "current_version": "5.6.35"
** 		    }
**      ]
**  }
**
*/

var mysql = require('mysql');
var logger = require('../logger.js');
var db_config = require("../../config/db.js");
var connection = mysql.createConnection(db_config.db);

module.exports = {
    POST: function (req, res)
        {
            if (req.body.packages)
            {
                rec(req.body.packages, 0);
                function rec(packages, key)
                {
                    if (packages[key] === undefined)
                    {
                        res.end(JSON.stringify(packages));
                    }
                    else
                    {
                        CheckVersion(packages[key].name, packages[key].version,
                            function(is_exists, version = '') {
                                if (is_exists)
                                {
                                    packages[key].url = '/packages/' + packages[key].name
                                        + '/' + packages[key].name + '_' + version + '.orig.tar.gz';
                                }
                                packages[key].version = version;
                                rec(packages, key+1);
                            });
                    }
                };
            }
            else
            {
                res.sendStatus(403);
            }
        }
}

function CheckVersion(name, version, callback)
{
    if (version === undefined)
    {
        var query = 'SELECT version FROM packages_versions JOIN packages ON packages.id = packages_versions.package_id'
        + ' WHERE packages.name = \'' + name + '\' ORDER BY version DESC LIMIT 1;';
        connection.query(query, function(err, rows, fields) {
            if (!err && rows[0] != undefined)
            {
                qry(name, rows[0].version);
            }
            else
            {
                logger.log(0, 'Package not found : ' + name);
                callback(false);
            }
        });
    }
    else
    {
        qry(name, version); 
    }

    function qry(name, version)
    {
        var query = 'SELECT name, version FROM packages_versions JOIN packages ON packages.id = packages_versions.package_id'
        + ' WHERE name = \'' + name + '\' AND packages_versions.version = \'' + version + '\'';
        connection.query(query, function(err, rows, fields) {
            if (!err && rows[0] != undefined)
            {
                logger.log(1, '[LOG] Successfully found package : ' + rows[0].name + ' version : ' + rows[0].version);
                return (callback(true, rows[0].version));
            }
            else
            {
                logger.log(0, 'Package name or version not found : ' + name + ' version : ' + version);
                return (callback(false));
            }
        });
    }
}
