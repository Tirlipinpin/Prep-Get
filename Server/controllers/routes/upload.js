/*
** '/upload' route
*/

var fs = require('fs');
var getRawBody = require('raw-body');

module.exports = {
    POST: function (req, res)
    {
        if (req.headers.package_name !== undefined
            && req.headers.package_version !== undefined
            && req.headers["content-type"] === "application/octet-stream") {
            getRawBody(req)
            .then(function (buf) {
                stats = fs.lstatSync('/the/path');
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