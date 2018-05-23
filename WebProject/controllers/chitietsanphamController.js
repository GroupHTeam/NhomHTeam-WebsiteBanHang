var taiKhoan = require('../models/taiKhoan');
var khachHang = require('../models/khachHang');
var sanPham = require('../models/sanPham');
var gioHang = require('../models/gioHang');
//var loaiSanPham = require('../models/loaiSanPham');
var chiTietGioHang = require('../models/chiTietGioHang');
var quanTriVien = require('../models/quanTriVien');


exports.chitietsanpham = function (req, res) {

    var i = req.params.id;
    console.log(i);
    sanPham.find({_id: i},function(err, docs){
        var sanPhamChunks =[];
    var chunkSize = 4;
    for(var i=0;i<docs.length;i += chunkSize){
      sanPhamChunks.push(docs.slice(i, i+ chunkSize));
    }
        res.render('frontend/home/chitietsanpham', {sanphamct:sanPhamChunks});
    });  
}

// exports.chitietsanpham = function (req, res) {
//     SanPham.findById(req.params.id, function (err, doc){
//         res.render('frontend/home/chitietsanpham', { 
//           title: 'My Site', 
//           sanphamct: doc 
//         });
//       });
// }