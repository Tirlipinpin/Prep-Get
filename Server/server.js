var express = require('express');
var bodyParser = require('body-parser');
var app = express();

const port = 4242;

app.use(bodyParser.json())

app.post('/test', function (req, res) {
    if (req.body.packets) {
        console.log("POST /");
        res.end(JSON.stringify(req.body));
    }
    else {
        res.sendStatus(403);
    }
})

.use(function (req, res) {
    res.sendStatus(403);
})

.listen(port);
console.log('Listening at http://localhost:' + port)