const { Router } = require("express");
const router = Router();

const jwt = require("jsonwebtoken");

const userRegisterModel = require("../src/models/userRegisterModel");
const blogPostModel = require("../src/models/blogPostModel");
const commentsModel = require("../src/models/commentsModel");
const likeModel = require("../src/models/likeModel");
const verifyAuth = require("../Middleware/verifyAuth");

const likeController = require("../Controller/likeController");

router.get("/update_like_count/:id", verifyAuth,  likeController.update_like_count);


module.exports = router;