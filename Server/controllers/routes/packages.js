/*
** '/packages' route
*/

var fs = require('fs');
var path = require('path');
var appDir = path.dirname(require.main.filename);

module.exports = {
    GET: function (req, res)
    {
        console.log(appDir + req.originalUrl);
        if (fs.existsSync(appDir + req.originalUrl)) {
            console.log('[LOG] Successfully downloaded package : ' + req.originalUrl);
            res.sendFile(req.originalUrl, {root: appDir });
        }
        else {
            console.log('[ERROR] Package file not found : ' + req.originalUrl);
            res.sendStatus(404);
        }
    }
}

