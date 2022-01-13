const { Router } = require("express");
const verifyAuth = require("../Middleware/verifyAuth");
const commentController = require("../Controller/commentController");

const router = Router();

router.get("/comments/:id", verifyAuth, commentController.get_comments);

router.post("/post_comment/:id", verifyAuth, commentController.post_comment);


module.exports = router;