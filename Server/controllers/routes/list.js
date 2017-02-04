/*
** '/list' route
*/

module.exports = {
    GET: function (req, res)
    {
        connection.query('SELECT name FROM packages ORDER BY name ASC', function(err, rows, fields) {
            if (!err && rows[0] != undefined) {
                logger.log(1, 'List successfully append');
                res.end(JSON.stringify(rows));
            }
            else {
                logger.log(0, 'Cannot get all packages by /list');
                res.sendStatus(404);
            }
        })
    }
}

