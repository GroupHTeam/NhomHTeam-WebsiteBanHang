var mongoose = require('mongoose');

var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var cateSchema = new Schema(
	{
	  name:  String,
	  ma: String
	}
);

module.exports = mongoose.model('Cate', cateSchema);