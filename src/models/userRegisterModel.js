const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    full_name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    image : {
        type : String,
    },
    mobile : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true,
        minlength : [6, "Password length should be atleast of 6 characters"]
    },
    cpassword : {
        type : String,
        required : true,
        minlength : [6, "Password length should be atleast of 6 characters"]

    }
});

// generating the jwt token
// userSchema.methods.gerateAuthToken = function (req,res,next){
   


//     next();
// }


const userRegisterModel = mongoose.model("user", userSchema);

module.exports = userRegisterModel;