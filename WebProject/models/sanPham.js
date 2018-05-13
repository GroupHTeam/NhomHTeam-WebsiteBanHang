var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var sanPhamSchema = new Schema(
    {
      imagePath: {type: String, required: true},
      description: {type: String, required: true},
      maSanPham: {type: String, required: true, max: 10},
      tenSanPham: {type: String, required: true},
      maLoaiSanPham: {type: String, required:true, max:10},
      gia: {type: Number, required: true}
    }
  );

  module.exports = mongoose.model('sanPham', sanPhamSchema);

