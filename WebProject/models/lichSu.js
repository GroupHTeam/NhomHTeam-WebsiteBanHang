var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var lichSuSchema = new Schema(
    {
      maKH: {type: String, required: true},
      maDonHang: {type: String, required: true},
      ngayDatHang: {type: String, required: true},
      tongThanhToan: {type: Number, required: true},
      trangThai: {type:String , require:true}
    }
  );

  module.exports = mongoose.model('lichSu', lichSuSchema);