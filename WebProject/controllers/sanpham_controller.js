var express = require('express');
var router = express.Router();

var sanPham = require('../models/sanPham');

// Display list of all sản phẩm
exports.sanPham_list = function(req, res, next) {
 var noMatch = null;
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all campgrounds from DB
        sanPham.find({tenSanPham: regex}, function(err, allSanPham){
           if(err){
               console.log(err);
           } else {
              if(allSanPham.length < 1) {
                  noMatch = "Không tìm thấy kết quả nào, vui lòng thử lại.";
              }
              var sanPhamChunks =[];
			    var chunkSize = 4;
			    for(var i=0;i<allSanPham.length;i += chunkSize){
			      sanPhamChunks.push(allSanPham.slice(i, i+ chunkSize));
			    }
              res.render('frontend/home/aothoitrang',{sanPhams:sanPhamChunks, noMatch: noMatch});
           }
        });
    } else {
    	res.redirect('/');
       //  // Get all campgrounds from DB
       //  sanPham.find({}, function(err, allSanPham){
       //     if(err){
       //         console.log(err);
       //     } else {
       //     	var sanPhamChunks =[];
			    // var chunkSize = 4;
			    // for(var i=0;i<allSanPham.length;i += chunkSize){
			    //   sanPhamChunks.push(allSanPham.slice(i, i+ chunkSize));
			    // }
       //        res.render("frontend/home/aothoitrang",{sanPhams:allSanPham, noMatch: noMatch});
       //     }
       //  });
    }
};

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

