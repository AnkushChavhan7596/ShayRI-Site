const blogPost = require("../src/models/blogPostModel");
const blogPostModel = require("../src/models/blogPostModel");


module.exports.update_like_count = async(req, res)=>{

    const token = await req.cookies.jwt;

    if(token){
        const currentBlogID  = req.params.id;
        const currentBlogPost = await blogPostModel.findById(currentBlogID);
    
        const findBlogAndUpdateLike = await blogPostModel.findByIdAndUpdate(currentBlogID,{
            likeCount : currentBlogPost.likeCount + 1
        });

        if(!findBlogAndUpdateLike) throw Error("Something wents wrong");

        res.redirect(`/blogs`);
    }
   else{
       res.redirect("/login");
   }
  

    
};