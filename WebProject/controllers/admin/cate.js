//var csrf = require('csurf');
var express = require('express');
var router = express.Router();

var Cate = require('../../models/cate.js');

exports.danhsach_get = function(req, res, next) {
	console.log("co vao day k?");
	var cates = Cate.find(function(err, docs){
	var productChunks= [];
	var chunkSize = 1;
	for(var i=0;i<docs.length;i += chunkSize){
      productChunks.push(docs.slice(i, i+ chunkSize));
    }
		res.render('../admin/cate/danhsach', {cates: productChunks,  layout:'../../admin/layouts/layout.hbs'});
	})
}

exports.them_get =  function(req, res, next) {
  res.render('../admin/cate/them', { errors: null , layout:'../../admin/layouts/layout.hbs'});///
}

exports.sua_get = function(req, res, next) {
	Cate.findById(req.params.id, function(err, data){
		res.render('../admin/cate/sua',{ errors: null, data: data, layout:'../../admin/layouts/layout.hbs'});
	});	
}


exports.them_post = function(req, res, next) {
 
  req.check('name', 'Tên loại không được rỗng').notEmpty();
  req.check('ma', 'Mã loại là kí tự duy nhất').isLength({min:1, max:1});
  req.check('ma', 'Mã loại không được rỗng').notEmpty();
  
  var errors = req.validationErrors();
	if (errors) {
	  res.render('../admin/cate/them',{errors : errors , layout:'../../admin/layouts/layout.hbs'}); ///
	}else{

	var cate = new Cate({
		name 			: req.body.name,
		ma 				: req.body.ma
	});

	cate.save().then(function(){
		req.flash('success_msg', 'Đã Thêm Thành Công');
		res.redirect('/admin/cate/them-cate.html'); 
	});
}
}

exports.xoa_get =  function (req, res) {
	Cate.remove( {ma: req.params.id}, function(err) {
	if (err)
        throw err;
	console.log("Xoa thanh cong");
	//req.flash('success_msg', 'Đã Xoá Thành Công');
	res.redirect('/admin/cate/danh-sach.html');
	});
};

exports.sua_get = function(req, res, next){
	Cate.find({ma: req.params.id}).then(function(data){
			res.render('../admin/cate/sua',{errors: null, cate: data  , layout:'../../admin/layouts/layout.hbs'});
	});
};

exports.sua_post =  function (req, res) {
	//req.checkBody('name', 'Tên không được rổng').notEmpty();
	 req.check('name', 'Tên loại không được rỗng').notEmpty();
  	req.check('ma', 'Mã loại là kí tự duy nhất').isLength({min:1, max:1});
 	 req.check('ma', 'Mã loại không được rỗng').notEmpty();

    var errors = req.validationErrors();
	if (errors) {
		
		//var file = './public/upload/' + req.file.filename;
		//var fs = require('fs');
		//fs.unlink(file, function(e){
		//	if(e) throw e;

	  	res.render('../cate/them',{errors : errors , layout:'../../admin/layouts/layout.hbs'}); 
	
		}else{
  		//Products.findById(req.params.id).then(function(data){
			//Cate.find().then(function(cate){
				//res.render('admin/product/edit',{errors: errors, cate: cate, product: data});

			//}
		
	//}else{
		Cate.findOne({ ma: req.params.id},  function(err, data){
			//var file = './public/upload/' + data.img;
			//var fs = require('fs');
			//fs.unlink(file, function(e){
			//	if(e) throw e;
			 //}),

			data.name 			= req.body.name,
			data.ma 				= req.body.ma,

			data.save();
			console.log(data);
				//req.flash('success_msg', 'Đã Sửa Thành Công');
			res.redirect('/admin/cate/danh-sach.html');
			//})
		})
	}
};