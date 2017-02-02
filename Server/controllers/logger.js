/*
** A basic logger
*/

var fs = require('fs');
var colors = require('colors');
var config = require('../config/config.js');

module.exports = {
    log_route: function (req, res, next)
    {
        var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        var ip = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress;
        var logs = `\n[${date}] : ${ip.slice(7)}\n`
            + `Method : ${req.method}\n`
            + `Path : ${req.url}\n`
            + `Body : ${JSON.stringify(req.body)}\n`;
 
        /*console.log(`\n[${date}] : ${ip.slice(7)}`);
        console.log("Method : " + req.method);
        console.log("Path : " + req.url);
        console.log("Body : " + JSON.stringify(req.body));*/
        console.log(logs);
        fs.appendFileSync(config.log_file, logs);
        next();
    },
    log: function (kind, str)
    {
        if (kind === 0)
        {
            console.log(colors.red('[ERROR] ' + str));
        }
        else if (kind === 1)
        {
            console.log(colors.green('[LOG] ' + str));
        }
    }
}

