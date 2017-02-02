/*
** A basic logger
*/

var colors = require("colors");

module.exports = {
    log_route: function (req, res, next)
    {
        var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        var ip = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress;
    
        console.log(`\n[${date}] : ${ip.slice(7)}`);
        console.log("Method : " + req.method);
        console.log("Path : " + req.url);
        console.log("Body : " + JSON.stringify(req.body));
        next();
    },
    log: function (kind, str) {
        if (kind === 0) {
            console.log(colors.red('[ERROR] ' + str));
        } else if (kind === 1) {
            console.log(colors.green('[LOG] ' + str));
        }
    }
}
