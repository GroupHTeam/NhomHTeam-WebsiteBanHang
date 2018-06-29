var express = require('express');
var router = express.Router();
var user=require('../models/khachHang')
var sanPham = require('../models/sanPham');
var Comment = require('../models/comment');
var csrf = require('csurf');


exports.taocommentmoi = function(req, res, next){
console.log(req.params.id);
    sanPham.find({_id:req.params.id}, function(err, sanpham){
        if(err){
            console.log(err);
        } else {
             res.render("comment/new", {sanpham: sanpham, csrfToken: req.csrfToken()});
        }
    })
}

exports.taocomment = function(req, res){
	sanPham.findById(req.params.id, function(err, sanphams){
       if(err){
           console.log(err);
           res.redirect("/");
       } else {
       	console.log(req.user.tenKhachHang);
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               req.flash("error", "Lỗi!!!");
               console.log(err);
           } else {
               //add username and id to comment
               comment.author.id = req.user._id;
               comment.author.username = req.user.tenKhachHang;
               //save comment
               comment.save();
               sanphams.comments.push(comment);
               sanphams.save();
               console.log(req.user.tenKhachHang);
               req.flash("success_msg", "Nhập bình luận thành công");
               res.redirect('/chitietsanpham/' + sanphams._id);
           }
        });
       }
   });
}

exports.edit = function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
          res.redirect("back");
      } else {
        res.render("comments/edit", {sanPham_id: req.params.id, comment: foundComment});
      }
   });
}

exports.update = function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if(err){
          res.redirect("back");
      } else {
          res.redirect("/chitietsanpham/" + req.params.id );
      }
   });
}

exports.delete = function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           req.flash("success", "Xóa bình luận thành công");
           res.redirect("/chitietsanpham/" + req.params.id);
       }
    });
}