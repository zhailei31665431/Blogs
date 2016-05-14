var _          = require('underscore');
var fs         = require('fs');
var moment 		 = require('moment');
var jwt        = require('jsonwebtoken');
var mongoose   = require('mongoose');

var config     = require('./../../config');
var superSecret = config.secret;
module.exports = function(app, express){
    var apiRouter = express.Router();


//结尾
	if(express){
		return apiRouter;	
	}
	
}