const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    likeCount : {
        type : Number,
        required : true,
        default : 0
    }
})

const likeModel = mongoose.model("like", likeSchema);

module.exports = likeModel;
