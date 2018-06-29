var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var sanPhamSchema = new Schema(
    {
      imagePath: {type: String, required: true},
      description: {type: String, required: true},
      maSanPham: {type: String, required: true},
      tenSanPham: {type: String, required: true},
      gia: {type: Number, required: true},
      maLoai: {type:String , require:true},
      comments: [
      {
         type: mongoose.Schema.Types.ObjectId, ref: "Comment"
      }
   ]}
  );

  module.exports = mongoose.model('sanPham', sanPhamSchema);

