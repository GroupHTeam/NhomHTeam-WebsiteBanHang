var express = require('express');
var router = express.Router();

var Accout = require('../models/taiKhoan');
var Customers = require('../models/khachHang');


exports.infoaccout_get = function(req, res,next){
	Accout.find({_id: req.params.id}).then( function(data){	
		Customers.find({email: data[0].email}).then(function(data1){
		res.render('../default/user/profile',{ title: "Thong tin tai khoan", customers: data1, accout: data});
	});
});
};
