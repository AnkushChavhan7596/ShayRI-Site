const { Router } = require("express");
const router = Router();

const userPanalController = require("../Controller/userPanalController");

router.get("/edit_profile", userPanalController.edit_profile_get);
router.post("/edit_profile_And_post/:id",userPanalController.edit_profile_post);

router.get("/profile_details", userPanalController.get_profile_details);


module.exports = router;