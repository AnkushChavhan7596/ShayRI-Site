const express = require("express");

require('dotenv').config()

const jwt = require("jsonwebtoken");

// password Ankush7596

const app = express();

const path = require("path");

const ejs = require("ejs");

const multer = require("multer");

const port = process.env.PORT || 8000;

const authRoutes = require("./Routes/authRoutes");
const blogPostRoutes = require("./Routes/blogPostRoutes");
const commentRoutes = require("./Routes/commentRoutes");
const likeRoutes = require("./Routes/likeRoutes");
const userPanalRoutes = require("./Routes/userPanalRoutes");
const createPostRoutes = require("./Routes/createPostRoutes");
const allUsersRoutes = require("./Routes/allUsersRoutes");

const cookieParser = require("cookie-parser");

const verifyAuth = require("./Middleware/verifyAuth");



// ================= database connection ==============
const database = require("./src/db/database");



// ================= Models =========================
const userRegisterModel = require("./src/models/userRegisterModel");
const blogPostModel = require("./src/models/blogPostModel");
const feedbackModel = require("./src/models/feedbackModel");
// const likeModel = require("./src/models/likeModel");
// const req = require("express/lib/request");



// ================== various Paths =================
const static_path = path.join(__dirname, "./public");
const views_path = path.join(__dirname, "./templates/views");
// const partials_path = path.join(__dirname, "./templates/partials");


// ================== Middleware ====================
app.use(express.urlencoded({extended : false}));
app.use(express.static(static_path));
app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", views_path);
// app.set("partials", partials_path);



// =================== Routes ========================
app.use(authRoutes);
app.use(blogPostRoutes);
app.use(commentRoutes);
app.use(likeRoutes);
app.use(userPanalRoutes);
app.use(createPostRoutes);
app.use(allUsersRoutes);

app.get("/", async(req, res)=>{

    const token = await req.cookies.jwt;

    
    if(token){
        const getUser = jwt.verify(token, process.env.SECRETKEY);
        console.log(getUser);

        const user = await userRegisterModel.findById(getUser.id);

        const blogs = await blogPostModel.find();

        if(!blogs) throw Error("Something wents wrong");

        const feedbacks = await feedbackModel.find();

        if(!feedbacks) throw Error("Something wents wrong");
   
        res.render("home",{
            "user" : user,
            "blogs" : blogs,
            "feedbacks" : feedbacks,
            "login" : true,
        });
    }
    else{
        const blogs = await blogPostModel.find();

        
        const feedbacks = await feedbackModel.find();

        if(!feedbacks) throw Error("Something wents wrong");

        res.render("home",{
            "login" : false,
            "blogs" : blogs,
            "feedbacks" : feedbacks

        });
    }

});


// blogs page
app.get("/blogs", verifyAuth, async(req, res)=>{
    const token = await req.cookies.jwt;

    
    if(token){
        const getUser = jwt.verify(token, process.env.SECRETKEY);
        console.log(getUser);

        const user = await userRegisterModel.findById(getUser.id);

        const blogs = await blogPostModel.find();

        if(!blogs) throw Error("Something wents wrong");
   
        res.render("blogs",{
            "user" : user,
            "blogs" : blogs,
            "login" : true
        });
    }
    else{
        const blogs = await blogPostModel.find();

        res.render("blogs",{
            "login" : false,
            "blogs" : blogs
        });
    }
});



// user panal
app.get("/userPanal", verifyAuth, async(req, res)=>{
    const token = await req.cookies.jwt;

    
    if(token){
        const getUser = jwt.verify(token, process.env.SECRETKEY);
        console.log(getUser);

        const user = await userRegisterModel.findById(getUser.id);

        const blogs = await blogPostModel.find();

        if(!blogs) throw Error("Something wents wrong");
   
        res.render("userPanal",{
            "user" : user,
            "blogs" : blogs,
            "login" : true,
            "currentUserID" : getUser.id
        });
    }
    else{
        // const blogs = await blogPostModel.find();

        // res.render("blogs",{
        //     "login" : false,
        //     "blogs" : blogs
        // });
        res.redirect("/login");
    }
});





// ================== Server Listening ===============
app.listen(port, ()=>{
    console.log(`Server is listening on the port ${port}`);
})