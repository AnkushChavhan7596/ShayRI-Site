const jwt = require("jsonwebtoken");
const userRegisterModel = require("../src/models/userRegisterModel");
const commentModel = require("../src/models/commentsModel");
const blogPostModel = require("../src/models/blogPostModel");

module.exports.get_comments = async(req, res)=>{


    const currentBlogID = req.params.id;

    const token = await req.cookies.jwt;

    if(token){

        const getUser = jwt.verify(token, process.env.SECRETKEY);
        if(!getUser) throw Error("Something wents wrong");


        // getting the user which is commenting
        const user = await userRegisterModel.findById(getUser.id);
        if(!user) throw Error("Something wents wrong");
        console.log(user);


         // getting the comments
         const comments = await commentModel.find();
         if(!comments) throw Error("Something wents wrong");


         // get the current blog on which you want to comment
         const currentBlog = await blogPostModel.findById(currentBlogID);
         console.log(currentBlog)

         if(!currentBlog) throw Error("Something wents wrong");

        res.render("comments",{
            "login" : true,
            "user" : user,
            "comments" : comments,
            "currentBlogID" : currentBlogID,
            "currentBlog" : currentBlog,
        });
    }
    else{
        console.log("User is not logged in");
        res.redirect("/login");
    }

};



module.exports.post_comment = async(req, res)=>{

    const token = await req.cookies.jwt;

    const currentBlogID = req.params.id;

    if(token){

        const getUser = jwt.verify(token, process.env.SECRETKEY);
        if(!getUser) throw Error("Something wents wrong");

        // getting the user which is commenting
        const user = await userRegisterModel.findById(getUser.id);
        if(!user) throw Error("Something wents wrong");
        console.log(user)


    
        const { comment } = req.body;
   
        const postComment = new commentModel({
            comment : comment,
            userID : getUser.id,
            userName : user.full_name,
            currentBlogID : currentBlogID
        });

        const saveComment = await postComment.save();

        if(!saveComment) throw Error("Something wents wrong");

        res.redirect(`/comments/${currentBlogID}`);
    }
    else{
        console.log("User is not logged in");
        res.redirect("/login");
    }

};