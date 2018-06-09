var mongoose = require('mongoose');
var bcrypt=require('bcryptjs');
var Schema = mongoose.Schema;

var taiKhoanSchema = new Schema({
    email: {type: String, required: true, max: 100},
    matKhau: {type: String, required: true, max: 100},
});
var User=module.exports = mongoose.model('taiKhoan', taiKhoanSchema)

module.exports.createUser = function(newUser, callback){
  bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(newUser.matKhau, salt, function(err, hash) {
          newUser.matKhau = hash;
          newUser.save(callback);
      });
  });
}
module.exports.getUserByUsername = function(username, callback){
  var query = {email: username};
  User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
      if(err) throw err;
      callback(null, isMatch);
  });
}