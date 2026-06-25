const User=require("../models/user.js");


module.exports.renderSignUpForm = (req, res) => {
    res.render("users/signup.ejs");
}


module.exports.signUp = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash("success", "Welcome to WonderLust!");
            res.redirect("/listings");
        });
    } catch (error) {
        req.flash("error", "Already registered with this email or username. Please try again.");
        res.redirect("/register");
    }
}

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
}

module.exports.login = async(req, res) => {
    req.flash("success", "Welcome back!");
    res.redirect(res.locals.redirectUrl || "/listings");
}

module.exports.logout = (req, res,next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash("success", "You have been logged out!");
        res.redirect("/login");
    });
}