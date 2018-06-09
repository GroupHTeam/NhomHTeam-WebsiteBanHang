var taiKhoan = require('../models/taiKhoan');
var khachHang = require('../models/khachHang');
var sanPham = require('../models/sanPham');
var gioHang = require('../models/gioHang');
//var loaiSanPham = require('../models/loaiSanPham');
var chiTietGioHang = require('../models/chiTietGioHang');
var quanTriVien = require('../models/quanTriVien');


exports.chitietsanpham = function (req, res) {
sanPham.find({_id: req.params.id}).then( function(data){
        console.log(data)
        res.render('frontend/home/chitietsanpham', {sanphamct: data});
    });
};

