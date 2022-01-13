const { Router } = require("express");
const verifyAuth = require("../Middleware/verifyAuth");
const authController = require("../Controller/authController");

const router = Router();


router.get("/register", authController.register_get);

router.post("/register", authController.register_post);

router.get("/login", authController.login_get);

router.post("/login", authController.login_post);

router.get("/logout", verifyAuth, authController.logout);



module.exports = router;