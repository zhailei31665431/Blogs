var _          = require('underscore');
var fs         = require('fs');
var moment 		 = require('moment');
var jwt        = require('jsonwebtoken');
var mongoose   = require('mongoose');

var config     = require('./../../config');
var superSecret = config.secret;
module.exports = function(app, express){
  var User = require('./../schema/user');
  var Token = require('./../schema/token');
    var List = require('./../schema/list');
  var apiRouter = express.Router();
  apiRouter.route('/login')
    .all(function(req,res,next){next()})
    .post(function(req,res,next){
      var email = req.body.email || '';
      var password = req.body.password || '';
      User.findOne({email: email}, function (err, user) {
          if (err) throw err;
          if (!user) {
              res.json({
                  code:0,
                  error:{error_code:'',msg:'用户不存在！'}
              });
              next()
          } else if (user) {
              var validPassword = user.comparePassword(req.body.password);
              if (!validPassword) {
                  res.json({
                      code:0,
                      error:{error_code:'',msg:'密码错误！'}
                  });
              }else{
                  Token.findOne({email:email},function(error,token){
                      if(error) throw error;
                      if(!token){
                          var token = new Token();
                      }
                      var jwtToken = jwt.sign({
                          email:email
                      }, superSecret, {
                          expiresInMinutes: 1440 // expires in 24 hours
                      });
                      _.extend(token,{email:email,token:jwtToken})
                      token.save(function(error){
                          if(error){
                              res.json(error);
                          }else{
                              res.cookie('access_token',jwtToken,{maxAge:(1000*60*60*24),httpOnly:true});
                              res.json({
                                  code:0,
                                  data:User,
                                  token: jwtToken
                              });
                          }
                      })
                  })
              }
          }
      });
    })
  apiRouter.route('/list')
  	.all(function(req,res,next){next()})
  	.get(function(req,res,next){
        List.find({},function(error,list){
            res.json({code:0,list:list});
        });
  	})
  apiRouter.route('/updata')
    .all(function(req,res,next){next()})
    .post(function(req,res,next){
      next();
    })
    .put(function(req,res,next){
      next();
    })
	//结尾
	if(express){
		return apiRouter;	
	}
}