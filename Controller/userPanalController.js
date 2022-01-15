const jwt = require("jsonwebtoken");
const userRegisterModel = require("../src/models/userRegisterModel");
const blogPostModel = require("../src/models/blogPostModel");
const feedbackModel = require("../src/models/feedbackModel");

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

     const blogPosts = await blogPostModel.find();

    

     if(token){
 
         const getUserID = jwt.verify(token, process.env.SECRETKEY);
 
         if(!getUserID) throw Error("Something wents wrong");
 
         const currentUser = await userRegisterModel.findById(getUserID.id);
 
         if(!currentUser) throw Error("Something wents wrong");

          let numberOfPosts = 0;
         for(let i=0; i<blogPosts.length; i++){
            if(currentUser.id == blogPosts[i].userID){
                numberOfPosts++;
            }
        }
 
         res.render("profileDetails",{
             "currentUser" : currentUser,
             "blogPosts" : blogPosts,
             "numberOfPosts" : numberOfPosts
         });

      
 
     }
     else{
         console.log("User not exists");
         res.redirect("/login");
     }
    


}



module.exports.get_feedback = async (req, res)=>{

    // token
    const token = await req.cookies.jwt;

    const blogPosts = await blogPostModel.find();

   

    if(token){

        const getUserID = jwt.verify(token, process.env.SECRETKEY);

        if(!getUserID) throw Error("Something wents wrong");

        const currentUser = await userRegisterModel.findById(getUserID.id);

        if(!currentUser) throw Error("Something wents wrong");

         let numberOfPosts = 0;
        for(let i=0; i<blogPosts.length; i++){
           if(currentUser.id == blogPosts[i].userID){
               numberOfPosts++;
           }
       }

       const feedbacks = await feedbackModel.find();

        res.render("feedback",{
            "currentUser" : currentUser,
            "blogPosts" : blogPosts,
            "numberOfPosts" : numberOfPosts,
            "feedbacks" : feedbacks
        });

     

    }
    else{
        console.log("User not exists");
        res.redirect("/login");
    }
}



module.exports.post_feedback = async(req, res)=>{


     // token
     const token = await req.cookies.jwt;

     if(token){
 
         const getUserID = jwt.verify(token, process.env.SECRETKEY);
 
         if(!getUserID) throw Error("Something wents wrong");
 
         const currentUser = await userRegisterModel.findById(getUserID.id);
 
         if(!currentUser) throw Error("Something wents wrong");
 
        const feedbacks = await feedbackModel.find();
 
        const { rating, feedback } = req.body;

        const sendFeedback = new feedbackModel({
            rating : rating,
            feedback : feedback,
            senderName : currentUser.full_name
        });
    
        await sendFeedback.save();
    
        res.redirect("/");
      
 
     }
     else{
         console.log("User not exists");
         res.redirect("/login");
     }

   
}