const jwt =require("jsonwebtoken");
const userRegisterModel = require("../src/models/userRegisterModel");

module.exports.get_create_post = async(req, res)=>{

    const token = await req.cookies.jwt;

    if(token){
        const getUserID = jwt.verify(token, process.env.SECRETKEY);

        const user = await userRegisterModel.findById(getUserID.id);

        if(!user) throw Error("Something wents wrong");


        res.render("createPost.ejs",{
            "login" : true,
            "user" : user
        });
    }
    else{
        console.log("Token not exists");
        res.redirect("/login");
    }

   
}