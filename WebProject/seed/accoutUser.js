var Accout = require ('../models/accoutUser.js');

var mongoose = require('mongoose');
var bcrypt=require('bcryptjs');
mongoose.connect('mongodb://localhost:27017/WebProject');

var accs = [
	new Accout({
		ten: 'AdminName',
		matKhau: 'AdminPass'
	})
];

var done = 0;
for(var i = 0; i<accs.length; i++){
	accs[i].save(function(err, result){
		done++;
		if(done===accs.length)
			exit();
	})
}


function exit(){
    mongoose.disconnect();
}

