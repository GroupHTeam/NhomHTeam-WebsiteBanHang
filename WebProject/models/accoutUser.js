var mongoose = require('mongoose');
var bcrypt=require('bcryptjs');
var Schema = mongoose.Schema;

var taiKhoanSchema = new Schema({
    ten: {type: String, required: true, max: 100},
    matKhau: {type: String, required: true, max: 100},
    isAdmin: {type: Boolean, default: true}
});
var User=module.exports = mongoose.model('accoutUser', taiKhoanSchema)

module.exports.getUser = function(username, password,callback){
 var query = {ten: username, matKhau:password};
 User.find(query, callback);
}

module.exports.getUserById = function(id, callback){
 User.findById(id, callback);
}


// module.exports.comparePassword = function(candidatePassword, mk, callback){
//  bcrypt.compare(candidatePassword,hash, function(err, isMatch) {
 	
//      if(err) throw err;
//      callback(null, isMatch);
//  });
// }
