/*
** '/install' route
*/

var mysql = require('mysql');
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
                                        + '/' + packages[key].name + '_' + version + '.orig.tar.xz';
                                }
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
        connection.query('SELECT version FROM packages_versions JOIN packages ON packages.id = packages_versions.package_id WHERE packages.name = \'' + name + '\' ORDER BY version DESC LIMIT 1;', function(err, rows, fields) {
            if (!err && rows[0] != undefined)
            {
                qry(name, rows[0].version);
            }
            else
            {
                console.log('[ERROR] Package not found : ' + name);
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
        connection.query('SELECT name, version FROM packages_versions JOIN packages ON packages.id = packages_versions.package_id WHERE name = \'' + name + '\' AND packages_versions.version = \'' + version + '\'', function(err, rows, fields) {
            if (!err && rows[0] != undefined)
            {
                console.log('[LOG] Successfully found package : ' + rows[0].name + ' version : ' + rows[0].version);
                return (callback(true, rows[0].version));
            }
            else
            {
                console.log('[ERROR] Package name or version not found : ' + name + ' version : ' + version);
                return (callback(false));
            }
        });
    }
}

