const { Router } = require("express");
const allParticularPostsController = require("../Controller/allParticularPostsController");

const router = Router();

router.get("/all_particular_posts/:id",  allParticularPostsController.get_particular_posts);

module.exports = router;