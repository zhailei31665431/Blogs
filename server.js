var express    = require('express');    // call express
var app        = express();         // define our app using express
var config     = require('./config');
var mongoose   = require('mongoose');
var path       = require('path');
var bodyParser = require('body-parser');


app.use(bodyParser())
app.use(express.static(__dirname + '/'));

mongoose.connect(config.database);

var apiRoutes = require('./server/api/api')(app, express);
app.use('/api', apiRoutes);

var navRoutes = require('./server/navRouter/router')(app,__dirname)

app.use(express.static(__dirname + '/apps/'));

app.listen(config.port);

console.log('端口号是：'+config.port,'服务器已经启动')