var mongoose = require('mongoose');
var bcrypt=require('bcryptjs');
var Schema = mongoose.Schema;
var khachHangSchema = new Schema(
    {
      tenKhachHang: {type: String, required: true, max: 100},
      gioiTinh: {type: String, require:true},
      ngaySinh: {type: String, required: true},
      diaChi: {type: String, required:true, max:100},
      email: {type: String, required: true, max:100},
      soDienThoai: {type: String, required: true, max: 11},
    }
  );
//4. Model
var KhachHang= module.exports = mongoose.model('khachHang', khachHangSchema);
module.exports.createKhachHang = function(newKhachHang, callback){
  bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(newKhachHang.password, salt, function(err, hash) {
          newKhachHang.password = hash;
          newKhachHang.save(callback);
      });
  });
}
