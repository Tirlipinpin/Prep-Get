/*
** '/packages' route
*/

module.exports = {
    GET: function (req, res)
    {
        var filePath = req.originalUrl;

        if (fs.existsSync(__dirname + filePath))
        {
            console.log('[LOG] Successfully downloaded package : ' + filePath);
            res.sendFile(filePath, {root: __dirname });
        }
        else
        {
            console.log('[ERROR] Package file not found : ' + filePath);
            res.sendStatus(404);
        }
    }
}

