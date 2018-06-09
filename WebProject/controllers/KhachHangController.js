var express = require('express');
var expressValidator = require('express-validator');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var KhachHang = require('../models/khachHang');
var User = require('../models/taiKhoan');

exports.sign_up = function(req, res, next) {
    res.render('../default/user/signup', { title: 'Đăng kí', csrfToken: req.csrfToken() });
};
exports.sign_in = function(req, res, next) {
    res.render('../default/user/signin', { title: 'Đăng nhập', csrfToken: req.csrfToken() });
};

exports.dangki = function(req, res, next) {
    var ten = req.body.ten;
    var gioitinh = req.body.gioitinh;
    var ngaysinh = req.body.ngaysinh;
    var email = req.body.email;
    var sdt = req.body.sdt;
    var matkhau = req.body.matkhau;
    var diachi = req.body.diachi;

    //Validation
    req.checkBody('ten', 'Tên không được để trống').notEmpty();
    req.checkBody('email', 'Email không được để trống').notEmpty();
    req.checkBody('email', 'Email không hợp lệ').isEmail();
    req.checkBody('matkhau', 'Mật khẩu không được để trống').notEmpty();
    req.checkBody('matkhau', 'Mật khẩu không được nhỏ hơn 6 kí tự').isLength({min:6});
    req.checkBody('sdt', 'Số điện thoại không được để trống').notEmpty();
    req.checkBody('diachi', 'Địa chỉ không được để trống').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        res.render('../default/user/signup', { title: 'Đăng kí', errors: errors, csrfToken: req.csrfToken() });
    } else {
        User.findOne({
            email: {
                "$regex": "^" + email + "\\b",
                "$options": "i"
            }
        }, function(err, mail) {
            if (mail) {
                res.render('../default/user/signup', {title: 'Đăng kí',
                     mail:mail,csrfToken: req.csrfToken()});
            } else {
                var newKhachHang = new KhachHang({
                    tenKhachHang: ten,
                    gioiTinh: gioitinh,
                    ngaySinh: ngaysinh,
                    diaChi: diachi,
                    email: email,
                    soDienThoai: sdt
                });
                KhachHang.createKhachHang(newKhachHang, function(err, khachHang) {
                    if (err) throw err;

                });

                var newUser = new User({
                    email: email,
                    matKhau: matkhau
                })
                User.createUser(newUser, function(err, taiKhoan) {
                    if (err) throw err;

                })

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
            if (!user) {
                return done(null, false, { message: 'Email chưa được đăng kí' });
            }

            User.comparePassword(password, user.matKhau, function(err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Mật khẩu chưa chính xác' });
                }
            });
        });
    }));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});

exports.sign_out= function (req, res,next) {
    req.logout();
    req.flash('success_msg', 'Bạn đã đăng xuất');
    res.redirect('/user/signin');
};

