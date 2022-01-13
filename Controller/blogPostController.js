
const blogPostModel = require("../src/models/blogPostModel");
const userRegisterModel = require("../src/models/userRegisterModel");
const jwt = require("jsonwebtoken");

module.exports.post_blog = async(req, res)=>{

      //getting the users token
      const token = await req.cookies.jwt;

      if(token){
                const getUser = jwt.verify(token, process.env.SECRETKEY);

                const user = await userRegisterModel.findById(getUser.id);
                if(!user) throw Error("Something wents wrong");
            

                const { blog, backgroundBlogImg } = req.body;

                const registerBlog = new blogPostModel({
                    blog : blog,
                    backgroundBlogImg : backgroundBlogImg,
                    userID : getUser.id,
                    userName :user.full_name
                });

                if(!registerBlog) throw Error("Something wents wrong"); 

                const saveBlog = await registerBlog.save();

                 if(!saveBlog) throw Error("Something wents wrong");
                
                 res.redirect("/blogs");
        }
        else{
            res.redirect("/login");
            console.log("User not logged in");
        }
  
};


module.exports.deleteBlogPost = async(req, res)=>{
   
    const getBlog = await blogPostModel.findByIdAndDelete(req.params.id);

    if(!getBlog) throw Error("Something wents wrong");

    res.redirect("/userPanal");

};

module.exports.editBlog = async(req, res)=>{
    
  const token = await req.cookies.jwt;

  if(token){

    const getUser = jwt.verify(token, process.env.SECRETKEY);

    const user = await userRegisterModel.findById(getUser.id);

    const getBlog = await blogPostModel.findById(req.params.id);
  
    if(!getBlog) throw Error("Something wents wrong");

    res.render("editBlog",{
        "blog" : getBlog,
        "login" : true,
        "user" : user
    });
    

  }else{
      console.log("Token not found");
  }

};



module.exports.editBlogAndPost = async(req,res)=>{

    const { blog , backgroundBlogImg } =req.body;

   const postBlog = await blogPostModel.findByIdAndUpdate(req.params.id,{
        blog : blog,
        backgroundBlogImg : backgroundBlogImg
   });


   if(!postBlog) throw Error("Something wents wrong");

   res.redirect("/userPanal");

}