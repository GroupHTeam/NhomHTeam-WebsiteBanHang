
var sanPham = require('../models/sanPham');
var gioHang = require('../models/gioHang');
//var loaiSanPham = require('../models/loaiSanPham');
var Cart = require('../models/cart');
var quanTriVien = require('../models/quanTriVien');
var Order = require('../models/order');
var khachHang = require('../models/khachHang');

exports.themvaogio = function( req, res, next){
    var SanPhamId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart: {});
    sanPham.findById (SanPhamId, function(err, sanpham){
        if(err){
            return res.redirect('/');
        }
        cart.add(sanpham, sanpham.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/giohang');
    });
};

exports.giohang = function(req, res, next){
    if(!req.session.cart){
        return res.render('frontend/home/giohang', {sanphams: null});
    }
    var cart = new Cart(req.session.cart)
    res.render('frontend/home/giohang', {sanphams: cart.generateArray(), totalPrice: cart.totalPrice });
    
}

exports.giohang_bo_1 = function(req, res, next){
    var SanPhamId = req.params.id;
    var cart = new Cart(req.session.cart);
    sanPham.findById (SanPhamId, function(err, sanpham){
        if(err){
            return res.redirect('/');
        }
        cart.remove(sanpham, sanpham.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/giohang');
    });
}

exports.giohang_bo_all = function(req, res, next){
    var SanPhamId = req.params.id;
    var cart = new Cart(req.session.cart);
    sanPham.findById (SanPhamId, function(err, sanpham){
        if(err){
            return res.redirect('/');
        }
        cart.removeall(sanpham, sanpham.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/giohang');
    });
}

exports.kiemtra = function(req, res, next){
    if(!req.session.cart){
        return res.redirect('/giohang')
    }
    var cart = new Cart(req.session.cart)
    if (cart.totalPrice == 0)
    {
        req.flash('success', 'Giỏ hàng trống, hãy chọn sản phẩm');
        req.session.cart = null;
        return res.redirect('/');
    }

    var errMsg = req.flash('error')[0];
    res.render('frontend/home/kiemtra', {total: cart, errMsg: errMsg, noError: !errMsg, csrfToken: req.csrfToken()} )
}


exports.luuthongtin = function(req, res, next){
    console.log('thanh cong');
    var cart = new Cart(req.session.cart);

    if(!req.session.cart){
        return res.redirect('/giohang')
    }
   

    var order = new Order({
        khachHang: req.khachHang,
        cart: cart,
        name: req.body.name,//name của người nhận hàng
        address: req.body.address,//Dia chi người nhận hàng
        phone: req.body.phone,//SDT người nhận hàng
    });

    console.log(order);

    Order.createOrder(order, function(err, order) {
        if (err) throw err;

    });

    order.save(function(err, result){
        req.flash('success', 'Bạn đặt hàng thành công');
        req.session.cart = null;
        res.redirect('/');
    })
    
};



