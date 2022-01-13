const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema({
    blog :{
        type : String,
        required : true
    },
    backgroundBlogImg : {
        type: String,
    },
    userID : {
        type : String,
        required : true
    },
    userName : {
        type : String, 
        required : true
    },
    likeCount : {
        type : Number,
        default : 0
    }
});

const blogPost = mongoose.model("blogPost", blogPostSchema);

module.exports = blogPost;