var express = require('express');
var router = express.Router();

var giohang = require('../../models/gioHang.js');
//var chitietgiohang = require('../../models/chiTietSanPham');
var order = require('../../models/order');
var sanPham =require('../../models/sanPham');
var Cart = require('../../models/cart');

exports.danhsach_get = function(req, res, next) {

	var Order = order.find(function(err, docs){
	var cartChunk= [];
	var chunkSize = 1;
	for(var i=0;i<docs.length;i += chunkSize){
      cartChunk.push(docs.slice(i, i+ chunkSize));
    }
		res.render('../admin/cart/list', {Orders: cartChunk , layout:'../../admin/layouts/layout.hbs'});
	})
}

exports.chitietgiohang_get = function(req, res, next)
{
	order.find({ID: req.params.id},  function(err, orders){
		if(err){
			return res.write('Error!');
		}
		var cart;
		orders.forEach(function(order){
			cart = new Cart(order.cart);
			order.items = cart.generateArray();
		});
		console.log(orders);
    	res.render('../admin/cart/chitietgiohang', {title: "Thông tin giỏ hàng" ,orders: orders, layout:'../../admin/layouts/layout.hbs' });
	});
}

exports.thanhtoan_get = function(req,res,next){
	// var cart = order.updateOne({ID: req.params.id}, function(err,orders){
	// 	$set:{status: 0}

	// 	// orders.forEach(function(order){
	// 	// 	cart = new Cart(order.cart);
	// 	// 	order.items = cart.generateArray();
	// 	// });
		
	// 	console.log("update chua");
	// 	res.render('../admin/cart/chitietgiohang', {title: "Thông tin giỏ hàng" , layout:'../../admin/layouts/layout.hbs' }) //,orders: orders
	// })

	order.updateOne({ID: req.params.id}, { $set: {status : 0}}, function (err, data) {
		console.log(data);
        if (err) throw err;
        console.log(data.status);
        console.log('update success: ');

        res.redirect('/admin/cart/danh-sach.html') //, {title: "Thông tin giỏ hàng" , layout:'../../admin/layouts/layout.hbs' });
    })

}

