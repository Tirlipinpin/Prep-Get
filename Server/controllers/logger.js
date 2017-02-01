/*
** A basic logger
*/

module.exports = {
    log: function (req, res, next)
    {
        var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        var ip = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress;
    
        console.log(`[${date}] : ${ip.slice(7)}`);
        console.log("Method : " + req.method);
        console.log("Path : " + req.url);
        console.log("Body : " + JSON.stringify(req.body) + "\n");
        next();        
    }
}

