var path       = require('path');
var jwt        = require('jsonwebtoken');
var moment 		 = require('moment');
var mongoose   = require('mongoose');
var config     = require('./../../config');
var superSecret = config.secret;

// var User = require('./../models/user');
// var Company = require('./../models/company');

module.exports = function(app,__dirname){
    app.engine('html', require('ejs').renderFile);
    function getToken(req){
        var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'] || (req.headers.cookie && req.headers.cookie.split('=')[1]);
        return token
    }
    // app.get('/index', function(req, res) {
    //     res.sendFile(path.join(__dirname + '/apps/views/saas/index/index.html'));
    // });
    // app.get('/login', function(req, res) {
    //     var token = getToken(req)
    //     if(token){
    //         jwt.verify(token, superSecret, function(err, decoded) {
    //             if (err) {
    //                 res.status(403).send({
    //                     code:0,
    //                     error:{
    //                         msg:'',
    //                         error_code:''
    //                     }
    //                 });
    //             } else {
    //                 if(decoded['exp']<parseInt(moment().valueOf()/1000)){
    //                     res.sendFile(path.join(__dirname + '/apps/views/saas/login/login.html'));
    //                 }else{
    //                     res.redirect('/works');
    //                 }
    //             }
    //         });
    //     }else{
    //        res.sendFile(path.join(__dirname + '/apps/views/saas/login/login.html'));
    //     }
    // });
    // app.get('/sinup', function(req, res) {
    //     res.sendFile(path.join(__dirname + '/apps/views/saas/sinup/index.html'));
    // });

    // app.get('/sinup/:id', function(req, res,next) {
    //     var token = req.params.id
    //     jwt.verify(token, superSecret, function(err, decoded) {
    //         //检查当前的token是否为有效的（是否存在，是否超时），跳转到注册页面
    //         if(decoded['exp']<parseInt(moment().valueOf()/1000)){
    //             res.sendFile(path.join(__dirname + '/apps/views/saas/error/timeout.html'));
    //         }else{
    //             res.sendFile(path.join(__dirname + '/apps/views/saas/sinupCompletion/index.html'));
    //         }
    //     })
    // });
    // app.get('/works',function(req,res,next){
    //     var token = getToken(req)
    //     if(token){
    //         jwt.verify(token, superSecret, function(err, decoded) {
    //             if (err) {
    //                 res.status(403).send({
    //                     code:0,
    //                     error:{
    //                         msg:'',
    //                         error_code:''
    //                     }
    //                 });
    //             } else {
    //                 if(decoded['exp']<parseInt(moment().valueOf()/1000)){
    //                     res.redirect('/index');
    //                 }else{
    //                     var data = {};
    //                     User.findOne({email: decoded["email"]}).select('id name email userType create_at company_id').exec( function (err, user) {
    //                         data['user'] = user;
    //                         if(user['company_id'] && user['company_id']!==''){
    //                             Company.findOne({_id:user['company_id']},function(error,company){
    //                                 console.log(company)
    //                                 data['user']['company'] = company
    //                             })
    //                         }
    //                     }).then(function(){
    //                         res.render(path.join(__dirname + '/apps/index.html'),data);
    //                     })
    //                 }
    //             }
    //         });
    //     }else{
    //         res.redirect('/index');
    //     }
    // })
    app.get('/', function(req, res) {
      res.sendFile(path.join(__dirname + '/app/view/index.html'));
    });
    app.get('/info:id',function(req, res){
      res.sendFile(path.join(__dirname + '/app/view/info.html'));
    })
    app.get('/login',function(req,res){
      res.sendFile(path.join(__dirname + '/app/view/login.html'));
    })
    app.get('/admin',function(req, res){
      var token = getToken(req)
      console.log(token,'123')
      if(token){
        jwt.verify(token, superSecret, function(err, decoded) {
          if (err) {
            res.status(403).send({
                code:0,
                error:{
                    msg:'',
                    error_code:''
                }
            });
          }else{
            res.render(path.join(__dirname + '/app/view/admin.html'),data);
          }
        });
      }else{
        res.redirect('/login');
      }
    })
}
