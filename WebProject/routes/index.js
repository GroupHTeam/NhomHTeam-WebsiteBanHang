var csrf = require('csurf');
var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');


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
var themvaogio_controller = require('../controllers/themvaogioController');

router.get('/',home_controller.index);


router.get('/ao-thoi-trang',aoThoiTrang_controller.sanPham_list); // Nó chạy từ đằng đây nè.... catalog.js không ảnh hưởng gì hết
router.get('/quan-', quan_controller.sanPham_list);
router.get('/vay-dam', dam_controller.sanPham_list);
router.get('/giay-', giay_controller.sanPham_list);
router.get('/chitietsanpham/:id',chitietsanpham_controller.chitietsanpham);
router.get('/themvaogio/:id',themvaogio_controller.themvaogio);
router.get('/giohang', themvaogio_controller.giohang);
router.get('/kiemtra', ensureAuthenticated, themvaogio_controller.kiemtra);
router.post('/',  themvaogio_controller.luuthongtin);
router.get('/giohang_bo_1/:id', themvaogio_controller.giohang_bo_1);

router.get('/about', function(req, res) {
    // res.render('/'. {output:req.params.id});
});
router.get('/user/signup', khachhang_controller.sign_up);
router.get('/user/signin', khachhang_controller.sign_in);
router.post('/user/signup', khachhang_controller.dangki);
router.get('/user/signout',  ensureAuthenticated,khachhang_controller.sign_out);
router.get ('/user/profile/:id', thongTin_controller.infoaccout_get);
//router.get('/user/profile/lich-su-giao-dich/:id', ensureAuthenticated,thongTin_controller.giaodich);
router.post('/user/profile/:id',thongTin_controller.capnhat);
router.get('/forgot',khachhang_controller.quenMK);
router.post('/forgot',khachhang_controller.forgot);
router.get('/reset/:token', khachhang_controller.reset);
router.post('/reset/:token', khachhang_controller.thaydoi)
router.post('/user/signin',khachhang_controller.dangnhap);

router.get('/user/profile/lichsudathang/:id',thongTin_controller.dathang);
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash('error_msg','Bạn chưa đăng nhập tài khoản');
        res.redirect('/user/signin');
    }
}





module.exports = router;