//var csrf = require('csurf');
var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
var sanPham = require('../models/sanPham');
var Comment = require('../models/comment');

//var passport=require('passport');
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

///////////////	  THAO TAC CUA ADMIN
var multer  = require('multer');

var Products = require('../controllers/admin/product');
var Cate = require('../controllers/admin/cate');
var Customer = require('../controllers/admin/customer');
var Cart = require('../controllers/admin/cart');
var User=require('../controllers/admin/logincontroller');
var Cates = require('../models/cate');
var product = require('../models/sanPham');
var expressValidator = require('express-validator');
var taikhoan=require('../models/khachHang');
var admin=require('../models/accoutUser')
//////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

//var csrfProtection = csrf({ cookie: true });

//router.use(csrfProtection);

var home_controller = require('../controllers/homeController');
var chitietsanpham_controller = require('../controllers/chitietsanphamController');
var khachhang_controller = require('../controllers/KhachHangController');
var aoThoiTrang_controller = require('../controllers/aothoitrang');
var quan_controller = require('../controllers/quan');
var dam_controller = require('../controllers/dam');
var giay_controller = require('../controllers/giay');
var thongTin_controller=require('../controllers/thongTinTaiKhoanController');
var themvaogio_controller = require('../controllers/themvaogioController');
var sanphamcontroller=require('../controllers/sanpham_controller')
var comment_Controller = require('../controllers/commentController')

router.get('/',home_controller.index);

router.get('/timkiem',sanphamcontroller.sanPham_list);
router.get('/ao-thoi-trang',aoThoiTrang_controller.sanPham_list);
router.get('/timkiemtheogia', aoThoiTrang_controller.timkiemtheogia10); // Nó chạy từ đằng đây nè.... catalog.js không ảnh hưởng gì hết
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
function kt(req, res, next) {
    if (req.isAuthenticated()) {
        taikhoan.findOne({ _id: req.session.passport.user }).then(function(data) {
            if (data) {
                res.redirect('/');
            } else {
                return next();
            }
        })
    } else {
        return next();
    }
}
router.get('/user/signup', khachhang_controller.sign_up);
router.get('/user/signin',kt, khachhang_controller.sign_in);
router.post('/user/signup', khachhang_controller.dangki);
router.get('/user/signout',  ensureAuthenticated,khachhang_controller.sign_out);
router.get ('/user/profile/:id', thongTin_controller.infoaccout_get);
router.get('/user/doimatkhau/:id',ensureAuthenticated,thongTin_controller.doimatkhau);
router.post('/user/doimatkhau/:id', thongTin_controller.doi)

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

      taikhoan.findOne({_id:req.session.passport.user}).then(function(data){   
      if (data)   {
        return next();
    } 
     else{
        res.redirect('/user/signin');
      }
    })}else {
        req.flash('error_msg','Bạn chưa đăng nhập tài khoản');
        res.redirect('/user/signin');
    }
}

function ensureAuthenticated1(req, res, next){ 
     if(req.isAuthenticated()){
      admin.findOne({_id:req.session.passport.user}).then(function(data){   
      if (data)   {  
        return next();
      }
      else{
        res.redirect('/admin/login');
      }
      })        
    } else {
        req.flash('error_msg','Bạn chưa đăng nhập tài khoản');
        res.redirect('/admin/login');
    }
}


router.get('/new/:id',  comment_Controller.taocommentmoi);
router.post('/new/:id',  comment_Controller.taocomment);
router.get('/:comment_id/edit',  comment_Controller.edit );
router.put('/:comment_id',  comment_Controller.update);
router.put('/:comment_id',  comment_Controller.delete);

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname);
    //cb(null, file.originalname)
  }
});

var upload = multer({ storage: storage });
	

/* GET home page. */
router.get('/admin' ,ensureAuthenticated1,function(req, res, next) { //, ensureAuthenticated1
  res.render('../admin/index', { title: 'Admin page' , layout:'../../admin/layouts/layout.hbs'});
});
router.get('/admin/login',User.login_in);
router.post('/admin/login',User.dangnhap);

// Category 
router.get('/admin/cate/danh-sach.html', Cate.danhsach_get);
router.get('/admin/cate/them-cate.html', Cate.them_get);
router.post('/admin/cate/them-cate.html', Cate.them_post);
router.get('/admin/cate/:id/xoa-cate.html', Cate.xoa_get);
router.get('/admin/cate/:id/sua-cate.html', Cate.sua_get);
router.post('/admin/cate/:id/sua-cate.html', Cate.sua_post);

// Product
router.get('/admin/product/danh-sach.html', Products.danhsach_get);
router.get('/admin/product/them-san-pham.html', Products.themsanpham_get);
//router.post('/product/them-san-pham.html/submit',Products.themsanpham_post);
router.get('/admin/product/:id/sua-product.html', Products.suasanpham_get);
//router.post('/admin/product/:id/sua-product.html', Products.suasanpham_post);
router.get('/admin/product/:id/xoa-product.html', Products.xoasanpham_get);


// Customers
router.get('/admin/customer/danhsach.html', Customer.accout_get);
router.get('/admin/customer/:id/infoaccout.html', Customer.infoaccout_get);
router.get('/admin/customer/:id/xoa-customer.html', Customer.xoa_get);


// Giỏ hàng
router.get('/admin/cart/danh-sach.html', Cart.danhsach_get);
router.get('/admin/cart/:id/chitietgiohang.html', Cart.chitietgiohang_get);
router.get('/admin/cart/:id/chitietgiohang.html/thanhtoan', Cart.thanhtoan_get);

///////////////////////////////////////////////////////////////////
///////////////////////// them san phẩm
router.post('/admin/product/them-san-pham.html/submit', upload.single('hinh'), function(req, res, next) {
    // Validation
    req.check('maSanPham', 'Ma san pham khong duoc rong').notEmpty();
    req.check('name', 'Tên không được rổng').notEmpty();
    req.check('maLoai', 'Chưa chọn mã loại').notEmpty();

    console.log(req.file);

    var errors = req.validationErrors();

    console.log(req.validationErrors());

    if (errors) {
        var file = './public/upload/' + req.file.filename;
        // var fs = require('fs');
        // fs.unlink(file, function(e){
        //  if(e) throw e;
        // });
        var cates = Cates.find(function(err, docs) {
            var cateChunks = [];
            var chunkSize = 1;
            for (var i = 0; i < docs.length; i += chunkSize) {
                cateChunks.push(docs.slice(i, i + chunkSize));
            }
            res.render('../admin/product/add', {
                title: "Thêm Sản Phẩm",
                cates: cateChunks,
                layout: '../../admin/layouts/layout.hbs',
                errors: errors
            });
        });
    } else {
        var pro = new product({
            maSanPham: req.body.maSanPham,
            tenSanPham: req.body.name,
            imagePath: req.file.filename,
            maLoai: req.body.maLoai,
            description: req.body.des,
            gia: req.body.gia,
        });
        pro.save().then(function() {
            req.flash('success_msg', 'Đã Thêm Thành Công');
            res.redirect('/admin/product/danh-sach.html');
        });
    }
});
// Kết thúc add sản phẩm

/////// Sửa sản phẩm
router.post('/admin/product/:id/sua-product.html', upload.single('hinh'), function(req, res, next) {
    // Validation
    req.check('name', 'Tên không được rổng').notEmpty();
    req.check('maLoai', 'Chưa chọn mã loại').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        var cates = Cates.find(function(err, docs) {
            var cateChunks = [];
            var chunkSize = 1;
            for (var i = 0; i < docs.length; i += chunkSize) {
                cateChunks.push(docs.slice(i, i + chunkSize));
            }

            res.render('../admin/product/edit', {
                title: "Sửa Sản Phẩm",
                cates: cateChunks,
                layout: '../../admin/layouts/layout.hbs',
                errors: errors
            });
        });

    } else {
        product.findOne({ maSanPham: req.params.id }, function(err, data) {
            //var file = './public/upload/' + data.img;
            //var fs = require('fs');
            //fs.unlink(file, function(e) {
            //        if (e) throw e;
            //    }),

            data.maSanPham = req.params.id,
            data.tenSanPham = req.body.name,
            data.imagePath = req.file.filename,
            data.maLoai = req.body.maLoai,
            data.description = req.body.des,
            data.gia = req.body.gia,
    
            data.save();
            req.flash('success_msg', 'Đã Sửa Thành Công');
            res.redirect('/admin/product/danh-sach.html');
            //})
        })
    }

});

// function checkSanPhamOwnership (req, res, next){
// 	if(req.isAuthenticated()){
//         sanPham.findById(req.params.id, function(err, foundSanPham){
//            if(err){
//                req.flash("error", "Không tìm thấy sản phẩm");
//                res.redirect("back");
//            }  else {
//                // does user own the campground?
//             if(foundSanPham.author.id.equals(req.khachHang._id)) {
//                 next();
//             } else {
//                 req.flash("error", "Bạn không thể thực hiện!!!");
//                 res.redirect("back");
//             }
//            }
//         });
//     } else {
//         req.flash("error", "Bạn cần đăng nhập trước khi thực hiện!!!");
//         res.redirect("back");
//     }
// }

// function checkCommentOwnership(req, res, next){
// 	if(req.isAuthenticated()){
//         Comment.findById(req.params.comment_id, function(err, foundComment){
//            if(err){
//                res.redirect("back");
//            }  else {
//                // does user own the comment?
//             if(foundComment.author.id.equals(req.khachHang._id)) {
//                 next();
//             } else {
//                 req.flash("error", "Bạn không thể thực hiện!!!");
//                 res.redirect("back");
//             }
//            }
//         });
//     } else {
//         req.flash("error", "Bạn cần đăng nhập trước khi thực hiện!!!");
//         res.redirect("back");
//     }
// }

// function isLoggedIn (req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     req.session.redirectTo = req.originalUrl;
//     req.flash("error", "Bạn cần đăng nhập trước khi thực hiện!!!");
//     res.redirect("/user/signin");
// }



module.exports = router;