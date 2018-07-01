//var csrf = require('csurf');
var express = require('express');
var expressValidator = require('express-validator');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
//var KhachHang = require('../models/khachHang');
var User = require('../models/khachHang');
var bcrypt=require('bcryptjs');
var User1=require('../models/accoutUser')


exports.sign_up = function(req, res, next) {
    req.logOut();
    res.render('../default/user/signup', { title: 'Đăng kí' });//, csrfToken: req.csrfToken()
};
exports.sign_in = function(req, res, next) {
    req.logOut();
    res.render('../default/user/signin', { title: 'Đăng nhập'});///
};

exports.dangki = function(req, res, next) {
    var ten = req.body.ten;
    var gioitinh = req.body.gioitinh;
    var ngaysinh = req.body.ngaysinh;
    var email = req.body.email;
    var sdt = req.body.sdt;
    var matkhau = req.body.matkhau;
    var diachi = req.body.diachi;
    var matkhau2=req.body.matkhau2

    //Validation
    req.checkBody('ten', 'Tên không được để trống').notEmpty();
    req.checkBody('email', 'Email không được để trống').notEmpty();
    req.checkBody('email', 'Email không hợp lệ').isEmail();
    req.checkBody('matkhau', 'Mật khẩu không được để trống').notEmpty();
    req.checkBody('matkhau', 'Mật khẩu không được nhỏ hơn 6 kí tự').isLength({min:6});
    req.checkBody('sdt', 'Số điện thoại không được để trống').notEmpty();
    req.checkBody('diachi', 'Địa chỉ không được để trống').notEmpty();
    req.checkBody('matkhau2', 'Mật khẩu không đúng.').equals(req.body.matkhau);

    var errors = req.validationErrors();
    if (errors) {
        res.render('../default/user/signup', { title: 'Đăng kí', errors: errors });///
    } else {
        User.findOne({
            email: {
                "$regex": "^" + email + "\\b",
                "$options": "i"
            }
        }, function(err, mail) {
            if (mail) {
                res.render('../default/user/signup', {title: 'Đăng kí',
                     mail:mail});///
            } else {
                var newKhachHang = new User({
                    tenKhachHang: ten,
                    gioiTinh: gioitinh,
                    ngaySinh: ngaysinh,
                    diaChi: diachi,
                    email: email,
                    soDienThoai: sdt,
                    matKhau: matkhau
                });
                User.createKhachHang(newKhachHang, function(err, khachHang) {
                    if (err) throw err;

                });

                req.flash('success_msg', 'Bạn đã đăng kí thành công và hãy đăng nhập bây giờ');
                res.redirect('/user/signin');
            };
        });
    };
};

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.getUserByUsername(username, function(err, user) {
            if (err) throw err;
            if (user.length == 0) {
                User1.getUser(username, password, function(err, user1) {
                    if (err) throw err;
                    if (user1.length == 0) {
                        return done(null, false, { message: 'Tài khoản chưa đúng!' });
                    } else {
                        return done(null,user1);
                    }
                })
            }else{
            User.comparePassword(password, user[0].matKhau, function(err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Mật khẩu chưa chính xác' });
                }
            });
        }
        });
    }));


passport.serializeUser(function(user, done) {
    done(null, user[0].id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});

exports.dangnhap=function(req, res, next) {
  passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/user/signin',
        failureFlash: true,
  })(req, res, next);
};

exports.sign_out= function (req, res,next) {
    req.logout();
    req.flash('success_msg', 'Bạn đã đăng xuất');
    res.redirect('/user/signin');
};

exports.quenMK=function(req, res, next){
    req.logout();
    res.render('../default/user/forgot',{tittle: 'Quên mật khẩu'});
}

exports.forgot = function(req, res, next) {
    async.waterfall([
        function(done) {
            crypto.randomBytes(20, function(err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function(token, done) {
            User.findOne({ email: req.body.email }, function(err, user) {
                if (!user) {
                    return res.render('../default/user/forgot', { title: 'Quên mật khẩu', errors: 'errors' });///
                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
                user.save(function(err) {
                    done(err, token, user);
                });
            });
        },
        function(token, user, done) {
            var transport = nodemailer.createTransport(smtpTransport({
                service:'Gmail',
                auth: {
                    user: 'hanhkim130497@gmail.com',
                    pass: 'lethikimhanh'
                }
            }));
            var mailOptions = {
                to: user.email,
                from: '"HTeamShop"<hanhkim130497@gmail.com>',
                subject: 'Node.js Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            transport.sendMail(mailOptions, function(err) {
                 req.flash('success_msg', 'Một email đã được gửi đến '+user.email+' với hướng dẫn thêm!');
                done(err);
            });
        }
    ], function(err) {
        if (err) return next(err);
        res.redirect('/forgot');
    });
};

exports.reset=function(req,res, next){
     User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      req.flash('error', 'Mã thông báo đã hết hạn hoặc không hợp lệ');
      return res.redirect('/forgot');
    }
    res.render('../default/user/reset', {
      user: req.user///
    });
  });
};

exports.thaydoi = function(req, res, next) {
    async.waterfall([
        function(done) {
            User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
                if (!user) {
                    req.flash('error', 'Mã thông báo đã hết hạn hoặc không hợp lệ');
                    return res.redirect('back');
                }
                var matkhau = req.body.matkhau;
                user.matKhau = matkhau;
                var matkhau2 = req.body.matkhau2;
                req.checkBody('matkhau', 'Mật khẩu không được nhỏ hơn 6 kí tự').isLength({ min: 6 });
                req.checkBody('matkhau2', 'Mật khẩu không trùng khớp.').equals(req.body.matkhau);
                var error = req.validationErrors();
                if (error) {
                    res.render('../default/user/reset', { title: 'Reset mật khẩu', error: error});///
                } else {
                    user.resetPasswordToken = undefined;
                    user.resetPasswordExpires = undefined;
                    User.createKhachHang(user, function(err, taiKhoan) {
                        if (err) throw err;
                    });
                    req.logIn(user, function(err) {
                        done(err, user);
                      });
                }
            })
        }
    ], function(err) {
         res.render('../default/user/signin', { title: "đăng nhập"});///
        //res.redirect('/');
    });
};