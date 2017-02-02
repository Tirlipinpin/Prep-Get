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
<<<<<<< HEAD
        var filePath = req.originalUrl;

        if (fs.existsSync(__dirname + filePath))
        {
            console.log('[LOG] Successfully downloaded package : ' + filePath);
            res.sendFile(filePath, {root: __dirname });
        }
        else
        {
            console.log('[ERROR] Package file not found : ' + filePath);
=======
        if (fs.existsSync(appDir + req.originalUrl)) {
            logger.log(1, 'Successfully downloaded package : ' + req.originalUrl);
            res.sendFile(req.originalUrl, {root: appDir });
        }
        else {
            logger.log(0, '[ERROR] Package file not found : ' + req.originalUrl);
>>>>>>> dd804eca5b0d732d160458514e0f7c4919f2eee8
            res.sendStatus(404);
        }
    }
}
