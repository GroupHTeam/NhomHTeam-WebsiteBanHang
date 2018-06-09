var TaiKhoan = require('../models/taiKhoan');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/WebProject');

function exit(){
    mongoose.disconnect();
}