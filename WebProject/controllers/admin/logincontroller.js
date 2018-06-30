var express = require('express');
var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt=require('bcryptjs');
var User=require('../../models/accoutUser')

exports.login_in = function(req, res, next) {
    res.render('../trang/test/thu', { title: 'Đăng nhập',layout:'../../trang/layouts/layout.hbs'});
};

exports.dangnhap=function(req, res, next) {
  passport.authenticate('local', {
        successRedirect: '/admin',
        failureRedirect: '/admin/login',
        failureFlash: true,
  })(req, res, next);
};