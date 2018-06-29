var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
    noidung: String,
    author: {
        id: { type: String, require: true},
        username: String
    }
});

module.exports = mongoose.model("Comment", commentSchema);