var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var chiTietSanPhamSchema = new Schema(
    {
      SanPham: { type: Schema.ObjectId, ref: 'sanPham', required: true },
      soLuong: {type: Number, required:true},
      solanxem:{type:Number, }
    }
  );

  module.exports = mongoose.model('chiTietSanPhamPham', chiTietSanPhamSchema);