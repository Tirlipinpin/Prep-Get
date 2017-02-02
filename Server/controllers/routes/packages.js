/*
** '/packages' route
*/

var fs = require('fs');
var path = require('path');
var logger = require('../logger.js');
var appDir = path.dirname(require.main.filename);

module.exports = {
    GET: function (req, res)
    {
        if (fs.existsSync(appDir + req.originalUrl))
        {
            logger.log(1, 'Successfully downloaded package : ' + req.originalUrl);
            res.sendFile(req.originalUrl, {root: appDir });
        }
        else
        {
            logger.log(0, '[ERROR] Package file not found : ' + req.originalUrl);
            res.sendStatus(404);
        }
    }
}

