var mongoose = require('mongoose');
var bcrypt=require('bcryptjs');
var Schema = mongoose.Schema;

var taiKhoanSchema = new Schema({
    email: {type: String, required: true, max: 100},
    matKhau: {type: String, required: true, max: 100},
    resetPasswordToken: {type: String},
    resetPasswordExpires:{type:Date}
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
  var query = {email: {
                "$regex": "^" + username + "\\b",
                "$options": "i"
            }};
  User.find(query, callback);
}

module.exports.getUserById = function(id, callback){
  User.find({_id:id}, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
      if(err) throw err;
      callback(null, isMatch);
  });
}