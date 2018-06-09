var KhachHang = require('../models/khachHang');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/WebProject');

function exit(){
    mongoose.disconnect();
}