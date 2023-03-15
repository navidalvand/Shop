const mongoose = require("mongoose");

const commentScheama = new mongoose.Schema({
    author : {type : mongoose.SchemaTypes.ObjectId , required : true},
    text : {type : String , required : true}
});

const CommentModel = mongoose.model("comments", commentScheama);

module.exports = { CommentModel };
