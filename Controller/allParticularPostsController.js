const blogPostsModel = require("../src/models/blogPostModel");


module.exports.get_particular_posts = async (req, res)=>{

    const userID = req.params.id;

    const blogPosts = await blogPostsModel.find();

    if(!blogPosts) throw Error("Something wents wrong");

    res.render("allParticularPosts",{
        "login" : true,
        "blogPosts" : blogPosts,
        "userID" : userID
    });
}