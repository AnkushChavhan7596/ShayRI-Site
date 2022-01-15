const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

let today = new Date();
let day = `${today.getDate() < 10 ? "0" : ""} ${today.getDate()}`;
let month = `${(today.getMonth() +1) < 10 ? "0" : ""} ${today.getMonth() + 1}`;
let year = today.getFullYear();

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

    },
    date_of_joining : {
        type : String,
        required : false,
        default : `${day}/${month}/${year}`

    }
});

// generating the jwt token
// userSchema.methods.gerateAuthToken = function (req,res,next){
   

//     next();
// }


const userRegisterModel = mongoose.model("user", userSchema);

module.exports = userRegisterModel;