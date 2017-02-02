/*
** '/upload' route
*/

var getRawBody = require('raw-body');

module.exports = {
    POST: function (req, res)
    {
        getRawBody(req)
        .then(function (buf) {
            res.statusCode = 200;
            console.log(buf.length);
            res.end(buf.length + ' bytes submitted');
        })
        .catch(function (err) {
            res.statusCode = 500;
            res.end(err.message);
        })
    }
}