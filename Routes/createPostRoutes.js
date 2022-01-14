const { Router } = require("express");
const createPostController = require("../Controller/createPostController");
const verifyAuth = require("../Middleware/verifyAuth");

const router = Router();

router.get("/get_create_post", verifyAuth, createPostController.get_create_post)


module.exports = router;