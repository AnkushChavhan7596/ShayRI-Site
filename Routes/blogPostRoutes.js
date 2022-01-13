const { Router } = require("express");
const verifyAuth = require("../Middleware/verifyAuth");
const blogPostController = require("../Controller/blogPostController");
const blogPostModel = require("../src/models/blogPostModel");

const router = Router();

router.post("/post_blog", blogPostController.post_blog);

router.get("/delete_blog/:id", blogPostController.deleteBlogPost);

router.get("/update_blog/:id", blogPostController.editBlog);

router.post("/edit_blog_and_Post/:id", blogPostController.editBlogAndPost);

module.exports = router;