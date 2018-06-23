var express = require('express');
var router = express.Router();

var Customers = require('../models/khachHang');
var Order = require('../models/order');
var Cart = require('../models/cart');
var khachHang = require('../models/khachHang');


exports.infoaccout_get = function(req, res,next){
	Customers.find({_id: req.params.id}).then( function(data){	
		var i = req.params.id;
		console.log(i);
		res.render('../default/user/profile',{ title: "Thong tin tai khoan", customers: data, csrfToken: req.csrfToken()});
	});
};


exports.dathang=function(req, res, next){
	Order.find({khachHang: req.khachHang}, function(err, orders){
		if(err){
			return res.write('Error!');
		}
		var cart;
		orders.forEach(function(order){
			cart = new Cart(order.cart);
			order.items = cart.generateArray();
		});
		console.log(orders);
		res.render('../default/user/lichsudathang',{ orders: orders});
	});
};

exports.capnhat = function(req, res, next) {
    Customers.updateOne({ _id: req.params.id },{
            $set: {

                tenKhachHang: req.body.ten,
                ngaySinh: req.body.ngaysinh,
                gioiTinh: req.body.gioitinh, 
                diaChi: req.body.diachi,
                soDienThoai: req.body.SDT
            }
        }).then(function(data) {
        	Customers.find({_id: req.params.id}).then(function(data1){
                res.render('../default/user/profile', { title: "Thông tin tài khoản", csrfToken: req.csrfToken(), customers: data1});
            })
        })
    }