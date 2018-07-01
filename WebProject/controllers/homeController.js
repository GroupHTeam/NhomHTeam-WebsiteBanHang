var taiKhoan = require('../models/taiKhoan');
var khachHang = require('../models/khachHang');
var SanPham = require('../models/sanPham');
var gioHang = require('../models/gioHang');
//var loaiSanPham = require('../models/loaiSanPham');
var quanTriVien = require('../models/quanTriVien');


exports.index = function(req, res, next) {
  var successMsg = req.flash('success')[0];
  SanPham.find({},function(err, docs){
    var sanPhamChunks =[];
    var chunkSize = 8;
    for(var i=0;i<4;i += chunkSize){
      sanPhamChunks.push(docs.slice(i, i+ chunkSize));
    }
    res.render('frontend/home/index', { title: 'WebProject', sanPhams: sanPhamChunks , successMsg: successMsg, noMessage: !successMsg});
  });

};












