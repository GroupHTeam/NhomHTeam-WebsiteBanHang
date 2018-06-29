var express = require('express');
var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt=require('bcryptjs');
var User=require('../../models/accoutUser')

exports.login_in = function(req, res, next) {
    res.render('../admin/users/login', { title: 'Đăng nhập',layout:'../../admin/layouts/layout.hbs'});
};
// passport.use(new LocalStrategy(
//     function(username, password, done) {
//         User.getUserByUsername(username, password,function(err, user) {
//             if (err) throw err;
//             if (user.length==0) {
//                 return done(null, false,  {message: 'Thông tin chưa chính xác!'});
//             }
//             else
//             {
//                  return done(null, user);
//              }

//             // User.comparePassword(password, user[0].matKhau, function(err, isMatch) {
//             //     if (err) throw err;
//             //     if (isMatch) {
//             //         return done(null, user);
//             //     } else {
//             //         return done(null, false, {message: 'Mật khẩu chưa chính xác'});
//             //     }
//             // });
//         });

//     }));

// passport.serializeUser(function(user, done) {
//     done(null, user[0].id);
// });

// passport.deserializeUser(function(id, done) {
//     User.getUserById(id, function(err, user) {
//         done(err, user);
//     });
// });

exports.dangnhap=function(req, res, next) {
  passport.authenticate('local', {
        successRedirect: '/admin',
        failureRedirect: '/admin/login',
        failureFlash: true,
  })(req, res, next);
};