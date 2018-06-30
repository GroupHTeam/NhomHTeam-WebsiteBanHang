var express = require('express');
var expressValidator = require('express-validator');
var router = express.Router();
var taikhoan = require('../models/khachHang')
var sanPham = require('../models/sanPham');
var Comment = require('../models/comment');

exports.taocomment = function(req, res) {
    sanPham.findById(req.params.id, function(err, sanphams) {
        if (err) {
            console.log(err);
            res.redirect("/");
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    req.flash("error", "Lỗi!!!");
                    console.log(err);
                } else {                   
                    var date=new Date();
                    comment.date=date.toLocaleDateString();
                    comment.time=date.toLocaleTimeString();
                    if (req.isAuthenticated()) {
                        taikhoan.findOne({ _id: req.session.passport.user }).then(function(data) {
                            if (data) {
                                 

                                comment.author.id = data._id;
                                comment.author.username = data.tenKhachHang;
                                comment.noidung = req.body.binhluan;

                                //save comment

                                comment.save();
                                sanphams.comments.push(comment);
                                sanphams.save();                               
                                req.flash("success_msg", "Nhập bình luận thành công");
                                res.redirect('/chitietsanpham/' + sanphams._id);
                            } else {
                                var ten = req.body.ten;
                                req.checkBody('ten', 'Bạn phải nhập tên').notEmpty();
                                var errors = req.validationErrors();
                                if (errors) {
                                    req.flash('error_msg', 'Bạn phải nhập tên để gửi bình luận');
                                    res.redirect('/chitietsanpham/' + sanphams._id);
                                } else {
                                    comment.noidung = req.body.binhluan;
                                    comment.author.username = req.body.ten;
                                    comment.save();
                                    sanphams.comments.push(comment);
                                    sanphams.save();
                                    req.flash("success_msg", "Nhập bình luận thành công");
                                    res.redirect('/chitietsanpham/' + sanphams._id);
                                }
                            }
                        })
                    } else {                       
                        var ten = req.body.ten;
                        req.checkBody('ten', 'Bạn phải nhập tên').notEmpty();
                        var errors = req.validationErrors();
                        if (errors) {
                            req.flash('error_msg', 'Bạn phải nhập tên để gửi bình luận');
                            res.redirect('/chitietsanpham/' + sanphams._id);
                        } else {
                            comment.noidung = req.body.binhluan;
                            comment.author.username = req.body.ten;
                            comment.save();
                            sanphams.comments.push(comment);
                            sanphams.save();
                            req.flash("success_msg", "Nhập bình luận thành công");
                            res.redirect('/chitietsanpham/' + sanphams._id);
                        }
                    }
                }
            })
        }
    })
}


exports.edit = function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if (err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", { sanPham_id: req.params.id, comment: foundComment });
        }
    });
}

exports.update = function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/chitietsanpham/" + req.params.id);
        }
    });
}

exports.delete = function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if (err) {
            res.redirect("back");
        } else {
            req.flash("success", "Xóa bình luận thành công");
            res.redirect("/chitietsanpham/" + req.params.id);
        }
    });
}