const express = require("express");
const router = express.Router();

// Login Route
router.get("/login", (req, res) => {
    res.render("login");
});

// Register Route
router.get("/signup", (req, res) => {
    res.render("signup");
});

// Sign up handling
router.post("/signup", (req, res) => {
    // console.log(req.body);
    const {name, email, password, password2} = req.body;
    let errors = [];
    // Check required fields
    if(!name || !email || !password || !password2) {
        errors.push({
            msg: "Please fill in all fields"
        });
    };
    // Checking if the passwords match
    if(password != password2) {
        errors.push({
            msg: "Passwords do not match!"
        });
    };
    // Check if password is at least 6 characters long
    if(password.length < 6) {
        errors.push({
            msg: "Password must be at least six characters"
        });
    };
    if(errors.length > 0) {
        res.render("signup", {
            errors, name, email, password, password2
        });
    } else {
        res.send("Valid");
    };
});

module.exports = router;