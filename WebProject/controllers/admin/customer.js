var express = require('express');
var router = express.Router();
var csrf = require('csurf');
//var Accout = require('../../models/taiKhoan');
var User = require('../../models/khachHang');

exports.accout_get = function(req, res){
	var acc = User.find(function(err, docs){
		accChunk = [];
		sizeChunk = 1;
		for(var i = 0; i<docs.length; i+=sizeChunk){
			accChunk.push(docs.slice(i, i+sizeChunk));
		}
		res.render('../admin/users/accout', {title: "Danh sach tai khoan khach hang", accouts: accChunk ,  layout:'../../admin/layouts/layout.hbs'});
	});
}

exports.infoaccout_get = function(req, res){
	User.find({email: req.params.id}).then( function(data){
		res.render('../admin/users/infoaccout',{ title: "Thong tin tai khoan", customers: data,  layout:'../../admin/layouts/layout.hbs'});
	});
}

exports.xoa_get = function(req, res)
{
	User.remove( {email: req.params.id}, function(err){
		console.log("Vao trang xoa customer");
	});

	// Accout.remove( {email: req.params.id}, function(err){
	// 	console.log("Vao trang xoa accouts");

	// 	if(err)
	// 	 throw err;
	// 	res.redirect('/admin/customer/danhsach.html');
	// });
}

