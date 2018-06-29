var taiKhoan = require('../models/taiKhoan');
var khachHang = require('../models/khachHang');
var sanPham = require('../models/sanPham');
var gioHang = require('../models/gioHang');
//var loaiSanPham = require('../models/loaiSanPham');
var quanTriVien = require('../models/quanTriVien');


// exports.chitietsanpham = function (req, res) {
// sanPham.find({_id: req.params.id}).then( function(data){
//         console.log(data)
//         res.render('frontend/home/chitietsanpham', {sanphamct: data});
//     });
// };
exports.chitietsanpham = function (req, res) {
	sanPham.find({_id:req.params.id}).populate("comments").exec(function(err, foundSanPham){
	        if(err){
	            console.log(err);
	        } else {
	            console.log(foundSanPham)
	            //render show template with that campground
	            res.render("frontend/home/chitietsanpham", {sanphamct: foundSanPham});
	        }
	    });
	};


