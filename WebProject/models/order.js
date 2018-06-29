var bcrypt=require('bcryptjs');
var mongoose = require('mongoose');
var khachHang = require('../models/khachHang');

var Schema = mongoose.Schema;
var orderSchema = new Schema(
    {
      ID: {type:String, required: true},
      cart: {type: Object, required: true},
      address: {type: String, required: true},
      name: {type: String, required: true},
      phone: {type: String, required: true},
      status: {type:Number}
    }
  );

  var order = module.exports = mongoose.model('order', orderSchema);

  module.exports.createOrder = function(order, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(order.password, salt, function(err, hash) {
            order.password = hash;
            order.save(callback);
        });
    });
  }
  