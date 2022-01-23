const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    rating : {
        type : Number,
        default : 5
    },
    feedback : {
        type : String, 
        required : true
    },
    senderName : {
        type : String,
        required : true
    },
    profilePic : {
        type : String,
        default : "./images/profile.png",
        required : false
    }
});

const feedbackModel = mongoose.model("feedback", feedbackSchema);

module.exports = feedbackModel;