var express = require('express');
var expressValidator = require('express-validator');
var router = express.Router();

var Accout = require('../models/taiKhoan');
var Customers = require('../models/khachHang');
var lichsu=require ('../models/lichSu');

exports.infoaccout_get = function(req, res, next) {
    Accout.find({ _id: req.params.id }).then(function(data) {
        Customers.find({ email: data[0].email }).then(function(data1) {
            res.render('../default/user/profile', { title: "Thông tin tài khoản", csrfToken: req.csrfToken(), customers: data1, accout: data});
        });
    });
};

exports.giaodich=function(req, res, next){
	Accout.find({ _id: req.params.id }).then(function(data) {
        lichsu.find({ maKH: data[0].email }).then(function(data1) {
            res.render('../default/user/profile', { title: "Lịch sử giao dịch", ls:data1, accout: data});
        });
    });
};

exports.capnhat = function(req, res, next) {
    Accout.find({ _id: req.params.id }).then(function(data) {
        Customers.updateOne({ email: data[0].email }, {
            $set: {

                tenKhachHang: req.body.ten,
                ngaySinh: req.body.ngaysinh,
                gioiTinh: req.body.gioitinh,
                diaChi: req.body.diachi,
                soDienThoai: req.body.SDT
            }
        }).then(function(data1) {
            Customers.find({email: data[0].email}).then(function(data2){
                res.render('../default/user/profile', { title: "Thông tin tài khoản", csrfToken: req.csrfToken(), customers: data2, accout: data });
            })
            
        })
    })


}