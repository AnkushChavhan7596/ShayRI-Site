const mongoose =require("mongoose");

const commentSchema = new mongoose.Schema({
      comment : {
          type : String,
          required : true
      },
      userID :{
          type : String,
          required : true
      },
      userName : {
          type : String,
          required : true
      },
      currentBlogID : {
          type : String,
          required : true
      }
});

const commentModel = mongoose.model("comment", commentSchema);

module.exports = commentModel;