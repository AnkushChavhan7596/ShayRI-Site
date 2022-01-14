const { Router } = require("express");
const allUsersController = require("../Controller/allUsersController");

const router = Router();
const verifyAuth = require("../Middleware/verifyAuth");


router.get("/all_users", verifyAuth, allUsersController.all_users);

module.exports = router;
