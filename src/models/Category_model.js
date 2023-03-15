const mongoose = require("mongoose");

const categoryScheama = new mongoose.Schema({
    title : {type : String , required : true}
});

const CategoryModel = mongoose.model("categories", categoryScheama);

module.exports = { CategoryModel };
