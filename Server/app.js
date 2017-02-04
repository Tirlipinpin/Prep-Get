var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config/config.js');
var logger = require('./controllers/logger.js');
var routes_handler = require('./controllers/routes_handler.js');
var app = express();
var router = express.Router();

// middleware that is specific to this router
router.use(logger.log_route)
      .post('/install', routes_handler.install.POST)
      .get('/packages/:package/:file', routes_handler.packages.GET)
      .post('/search', routes_handler.search.POST)
      .post('/upload', routes_handler.upload.POST)
      .get('/list', routes_handler.list.GET)
      .post('/token', routes_handler.token.POST)
      .get('*', routes_handler.all.GET)
      .post('*', routes_handler.all.POST)

app.use(bodyParser.json());
app.use(router);
app.listen(config.port);

console.log("Server ON :\n");

