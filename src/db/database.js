const mongoose = require("mongoose");
const  {MONGO_URI} = require("../config");

mongoose.connect( MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
})
.then((res)=>{
    console.log("DB Connect Successfully");
})
.catch((error)=>{
    res.status(400).json({msg : error})
    console.log(error)
});


module.exports = mongoose;