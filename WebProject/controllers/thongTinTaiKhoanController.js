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
		res.render('../default/user/profile',{ title: "Thong tin tai khoan", customers: data});
	});
};


exports.dathang=function(req, res, next){
	Order.find({ID: req.params.id}, function(err, orders){
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
                res.render('../default/user/profile', { title: "Thông tin tài khoản", customers: data1});///
            })
        })
    }

exports.doimatkhau=function(req, res, next){
	res.render('../default/user/doimatkhau',{title:'Đổi mật khẩu'})
}
exports.doi = function(req, res, next) {
	var matkhau=req.body.matkhau;
	var matkhau1 = req.body.matkhau1;
    var matkhau2 = req.body.matKhau2;
    req.checkBody('matkhau','Mật khẩu không được để trống').notEmpty();
    req.checkBody('matkhau1', 'Mật khẩu mới không được để trống').notEmpty();
    req.checkBody('matkhau1', 'Mật khẩu không được nhỏ hơn 6 kí tự').isLength({ min: 6 });
    req.checkBody('matkhau2', 'Mật khẩu không trùng.').equals(req.body.matkhau1);
    var errors = req.validationErrors();
    Customers.find({ _id: req.params.id }).then(function(tk) {
 		
        Customers.comparePassword(matkhau, tk[0].matKhau, function(err, isMatch) {
            if (err) throw err;
            if (isMatch) {
                if (errors) {
                    res.render('../default/user/doimatkhau', { title: 'Đổi mật khẩu', errors: errors });
                } else {
                	tk[0].matKhau=matkhau1;
      
                	Customers.createKhachHang(tk[0], function(err, taiKhoan) {
                        if (err) throw err;
                    });                   
                    res.render('../default/user/profile', { title: 'Profile', message: 'Đổi mật khẩu thành công!', customers: tk});
                }

            } else {
        
                res.render('../default/user/doimatkhau', { title: 'Đổi mật khẩu',  err:'Mật khẩu không đúng!'});
            }
        });
    })
    }