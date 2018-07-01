var taikhoan=require('../models/khachHang')
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



exports.chitietsanpham = function(req, res) {
    sanPham.find({ _id: req.params.id }).populate("comments").exec(function(err, foundSanPham) {
        var sanphamlienquan = [];
          sanPham.find({ maLoai: foundSanPham[0].maLoai }).then(function(splienquan) {
            
            var size = 4;
            for (var i = 0; i < 4; i += size) {
                sanphamlienquan.push(splienquan.slice(i, i + size));
            }
        })
        if (err) {
            console.log(err);
        } else {
            var solan = foundSanPham[0].solanxem + 1;
            sanPham.updateOne({ _id: req.params.id }, {
                $set: {
                    solanxem: solan
                }
            }).then(function(dt) {
                sanPham.find({ _id: req.params.id }).then(function(sp) {
                    var sanPhamChunks = [];
                    var chunkSize = 1;
                    for (var i = 0; i < sp[0].comments.length; i += chunkSize) {
                        sanPhamChunks.push(sp[0].comments.slice(i, i + chunkSize));
                    }

                    if (req.isAuthenticated()) {
                        taikhoan.findOne({ _id: req.session.passport.user }).then(function(data) {
                            if (data) {
                                res.render("frontend/home/chitietsanpham", { sanphamct: foundSanPham, com: sanPhamChunks,tk:data,splq:sanphamlienquan});
                            }
                            else{
                                res.render("frontend/home/chitietsanpham", { sanphamct: foundSanPham, com: sanPhamChunks,splq:sanphamlienquan});
                           
                            }
                        })

                    }
                    else {
                        res.render("frontend/home/chitietsanpham", { sanphamct: foundSanPham, com: sanPhamChunks,splq:sanphamlienquan});
                    }

                })
            })
        }
    })
}
               
