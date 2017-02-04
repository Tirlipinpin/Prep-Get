/*
** '/upload' route
*/

var fs = require('fs');
var getRawBody = require('raw-body');
var path = require('path');

var appDir = path.dirname(require.main.filename);

module.exports = {
    POST: function (req, res)
    {
        if (req.headers.package_name !== undefined
            && req.headers.package_version !== undefined
            && req.headers["content-type"] === "application/octet-stream") {
            getRawBody(req)
            .then(function (buf) {
                stats = fs.lstatSync(appDir + '/packages/' + req.headers.package_name);
                console.log(appDir + '/packages/' + req.headers.package_name);;
                if (stats.isDirectory()) {
                    
                }
                res.statusCode = 200;
                res.end(buf.length + ' bytes submitted');
            })
        } else {
            res.sendStatus(206);
        }
    }
}

