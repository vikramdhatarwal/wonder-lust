const express = require("express");
const router = express.Router({ mergeParams: true });
const User=require("../models/user.js");
const wrapAsync=require("../utils/wrapAsync.js");
const passport=require("passport");
const {saveRedirectUrl}=require("../middleware.js");

const userController=require("../controllers/users.js");
router.get("/register", userController.renderSignUpForm);


router.post("/register", wrapAsync(userController.signUp));

router.get("/login", userController.renderLoginForm);


router.post("/login",saveRedirectUrl,
    passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login"  
}),
userController.login);

router.get("/logout", userController.logout);


module.exports = router;
