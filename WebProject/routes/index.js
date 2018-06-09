var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var csrf = require('csurf');
var User = require('../models/taiKhoan');
//var passport=require('passport');
var csrfProtection = csrf({ cookie: true });

router.use(csrfProtection);

var home_controller = require('../controllers/homeController');
var chitietsanpham_controller = require('../controllers/chitietsanphamController');
var khachhang_controller = require('../controllers/KhachHangController');
var aoThoiTrang_controller = require('../controllers/aothoitrang');
var quan_controller = require('../controllers/quan');
var dam_controller = require('../controllers/dam');
var giay_controller = require('../controllers/giay');
var thongTin_controller=require('../controllers/thongTinTaiKhoanController');

router.get('/',home_controller.index);

router.get('/ao-thoi-trang',aoThoiTrang_controller.sanPham_list); // Nó chạy từ đằng đây nè.... catalog.js không ảnh hưởng gì hết
router.get('/quan-', quan_controller.sanPham_list);
router.get('/vay-dam', dam_controller.sanPham_list);
router.get('/giay-', giay_controller.sanPham_list);
router.get('/chitietsanpham/:id', chitietsanpham_controller.chitietsanpham);

router.get('/about', function(req, res) {
    // res.render('/'. {output:req.params.id});
});
router.get('/user/signup', khachhang_controller.sign_up);
router.get('/user/signin', khachhang_controller.sign_in);
router.post('/user/signup', khachhang_controller.dangki);
router.get('/user/signout', khachhang_controller.sign_out);
//router.post('/user/signin', khachhang_controller.dangnhap);
router.post('/user/signin',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/user/signin',
        failureFlash: true
    }),
    function(req, res) {

        res.redirect('/');
    });
router.get('/user/profile/:id', ensureAuthenticated,thongTin_controller.infoaccout_get);
router.get('/user/profile/lich-su-giao-dich/:id', ensureAuthenticated,thongTin_controller.giaodich);
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash('error_msg','Bạn chưa đăng nhập tài khoản');
        res.redirect('/user/signin');
    }
}
module.exports = router;