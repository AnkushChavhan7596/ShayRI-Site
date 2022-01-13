const jwt = require("jsonwebtoken");
const userRegisterModel = require("../src/models/userRegisterModel");

module.exports.edit_profile_get = async (req, res)=>{

    // token
    const token = await req.cookies.jwt;

    if(token){

        const getUserID = jwt.verify(token, process.env.SECRETKEY);

        if(!getUserID) throw Error("Something wents wrong");

        const currentUser = await userRegisterModel.findById(getUserID.id);

        if(!currentUser) throw Error("Something wents wrong");

        res.render("EditProfile",{
            "currentUser" : currentUser
        });
     


    }
    else{
        console.log("User not exists");
        res.redirect("/login");
    }

  
}



module.exports.edit_profile_post = async (req, res)=>{
    const { full_name, email, mobile } = req.body;

    const updateUser = await userRegisterModel.findByIdAndUpdate(req.params.id,{
        full_name : full_name,
        email : email,
        mobile : mobile
    });

    if(!updateUser) throw Error("Something wents wrong");

    await updateUser.save();
    res.redirect(`/userpanal`);
}




module.exports.get_profile_details = async (req, res)=>{

     // token
     const token = await req.cookies.jwt;

     if(token){
 
         const getUserID = jwt.verify(token, process.env.SECRETKEY);
 
         if(!getUserID) throw Error("Something wents wrong");
 
         const currentUser = await userRegisterModel.findById(getUserID.id);
 
         if(!currentUser) throw Error("Something wents wrong");
 
         res.render("profileDetails",{
             "currentUser" : currentUser
         });

      
 
     }
     else{
         console.log("User not exists");
         res.redirect("/login");
     }
    


}