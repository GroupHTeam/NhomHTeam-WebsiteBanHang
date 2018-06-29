var csrf = require('csurf');
var express = require('express');
var multer  = require('multer'); 
var router = express.Router();
var path = require('path');

var Products = require('../../models/sanPham');
var Cates = require('../../models/cate')

var storage = multer.diskStorage({//
  destination: function (req, file, cb) {
     cb(null, './public/upload')
  },
  filename: function (req, file, cb) {
    //cb(null, Date.now() + '_' + file.originalname);
    //cb(null, file.originalname)
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));

    console.log(file.fieldname);
    console.log(file.originalname);
  }
});

var upload = multer({ storage: storage });

// Hiển thị danh sách sản phẩm
exports.danhsach_get = function (req, res, next) {
	var products = Products.find(function(err, docs){
	var productChunks= [];
	var chunkSize = 1;
	for(var i=0;i<docs.length;i += chunkSize){
      productChunks.push(docs.slice(i, i+ chunkSize));
    }
		res.render('../admin/product/list', {products: productChunks,  layout:'../../admin/layouts/layout.hbs'});
	})
};

//Hiển thị form thêm sản phẩm
exports.themsanpham_get = function(req, res, next){
	var cates = Cates.find(function(err, docs){
		var cateChunks = [];
		var chunkSize = 1;
		for(var i = 0; i<docs.length; i+=chunkSize){
			cateChunks.push(docs.slice(i, i+chunkSize));
		}
			res.render('../admin/product/add', {title: "Thêm sản phẩm ", cates: cateChunks,  layout:'../../admin/layouts/layout.hbs'});///
	});
};


//Thêm sản phẩm vao mongodb



exports.suasanpham_get = function(req, res, next){
	Products.find({maSanPham: req.params.id}).then(function(data){
			res.render('../admin/product/edit',{errors: null, products: data,  layout:'../../admin/layouts/layout.hbs'});
	});
};

exports.suasanpham_post =  function (req, res) {
	//req.checkBody('name', 'Tên không được rổng').notEmpty();
	//req.checkBody('hinh', 'Hình không được rổng').notEmpty();
	//req.checkBody('gia', 'giá phải là số').isInt();
	//req.checkBody('des', 'Chi tiết không được rổng').notEmpty();

    var errors = req.validationErrors();
	if (errors) {
		
		var file = './public/upload/' + req.file.filename;
		var fs = require('fs');
		fs.unlink(file, function(e){
			if(e) throw e;
		 });
		}else{
  		//Products.findById(req.params.id).then(function(data){
			//Cate.find().then(function(cate){
				//res.render('admin/product/edit',{errors: errors, cate: cate, product: data});

			//}
		
	//}else{
		Products.findOne({ maSanPham: req.params.id},  function(err, data){
			//var file = './public/upload/' + data.img;
			//var fs = require('fs');
			//fs.unlink(file, function(e){
			//	if(e) throw e;
			 //}),

			data.maSanPham		= req.body.maSanPham,
			data.tenSanPham 	= req.body.name,
			data.imagePath 		= req.file.filename,
			data.maLoai 		= req.body.maLoai,
			data.description 	= req.body.des,
			data.gia 			= req.body.gia,

			data.save();
				//req.flash('success_msg', 'Đã Sửa Thành Công');
				res.redirect('/product/danh-sach.html');
			//})
		})
	}
};

exports.xoasanpham_get =  function (req, res) {
	Products.remove( {maSanPham: req.params.id}, function(err) {
	if (err)
        throw err;
	console.log("Xoa thanh cong");
	//req.flash('success_msg', 'Đã Xoá Thành Công');
	res.redirect('/admin/product/danh-sach.html');
	});
};
