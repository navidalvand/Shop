const mongoose = require("mongoose");

const sliderScheama = new mongoose.Schema({
    title : {type : String , required : true},
    image : {type : String , required : true},
    type : {type : String , required : true}
});

const SliderModel = mongoose.model("sliders", sliderScheama);

module.exports = { SliderModel };
