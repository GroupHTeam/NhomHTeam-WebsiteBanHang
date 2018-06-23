// var mongoose = require('mongoose')

// var Schema = mongoose.Schema;
// var chiTietGioHangSchema = new Schema(
//     {
//       maGioHang: {type: String, required: true, max: 10},
//       soLuong: {type: Number, required: true, min:1},
//       maSanPham: {type: String, required:true, max:10},
//     }
//   );

//   module.exports = mongoose.model('chiTietGioHang', chiTietGioHangSchema);
module.exports = function Cart(oldCart){
  this.items = oldCart.items || {};
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;

  this.add = function(item , id){
    var storedItem = this.items[id];
    if (!storedItem){
      storedItem = this.items[id] = {item: item , qty: 0 , gia:0};
    }
    storedItem.qty++;
    storedItem.gia = storedItem.item.gia * storedItem.qty;
    this.totalQty++;
    this.totalPrice +=storedItem.item.gia;
  };

  this.remove = function(item, id){
    var storedItem = this.items[id];
    if (!storedItem){
      storedItem = this.items[id] = {item: item , qty: 0 , gia:0};
    }
    if (storedItem.qty >0 && this.totalQty >0)
    {
      storedItem.qty--;
      storedItem.gia = storedItem.item.gia * storedItem.qty;
      this.totalQty--;
    this.totalPrice -=storedItem.item.gia;
    }
    else{
      storedItem.qty = 0;
      storedItem.gia = storedItem.item.gia * storedItem.qty;
      this.totalQty = 0;
      this.totalPrice = 0;
    }
    
  }

  this.generateArray = function(){
      var arr = [];
      for(var id in this.items){
        arr.push(this.items[id]);
      }
      return arr;
  };
}

